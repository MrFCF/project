<template>
    <div class="publishArticle">
        <el-row>
            <el-button class="publish_btn" @click="publish_btn">发布文章</el-button>
        </el-row>
        <el-row class="tabel_warp">
            <el-col :span="24">
                <search v-on:search="search_btn" ref="searchComponent" :searchData="searchData"></search>
                <div class="grid-content">
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="id" label="序号" width="80" align="center">
                        </el-table-column>
                        <el-table-column prop="title" label="标题" width="160" align="center" :show-overflow-tooltip=true>
                        </el-table-column>
                        <el-table-column prop="sort" label="分类" width="120" align="center">
                        </el-table-column>
                        <el-table-column prop="releasetime" label="发布日期" width="190" align="center">
                            <template slot-scope="tableData">
                                <span>{{tableData.row.releasetime | moment}}</span>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column prop="releasename" label="编辑人" width="95" align="center">
                        </el-table-column> -->
                        <el-table-column prop="top" label="是否置顶" width="100" align="center">
                        </el-table-column>
                        <el-table-column prop="staus" label="状态" width="80" align="center">
                            <template slot-scope="tableData">
                                <font v-if="tableData.row.staus == 1" color='#547BE8'>待审核</font>
                                <font v-else-if="tableData.row.staus == 2" color='#15BE9D'>已发布</font>
                                <font v-else-if="tableData.row.staus == 3" color='#F52653'>已驳回</font>
                                <font v-else-if="tableData.row.staus == 4" color='#414142'>草稿箱</font>
                            </template>
                        </el-table-column>
                        <el-table-column prop="reviewname" label="审核人" width="90" align="center">
                        </el-table-column>
                        <el-table-column prop="oppose" label="驳回原因" width="170" align="center" :show-overflow-tooltip=true>
                        </el-table-column>
                        <el-table-column prop="address" label="操作" width="170" align="center">
                            <template slot-scope="tableData">
                                <el-button v-show="tableData.row.staus != 1 && tableData.row.staus != 2" size="mini" @click="handleEdit(tableData.$index, tableData.row)" class="editArticle">编辑</el-button>
                                <el-button v-show="tableData.row.staus == 2" size="mini" @click="handleSee(tableData.$index, tableData.row)" class="seeArticle">查看</el-button>
                                <el-button v-show="tableData.row.staus != 2" size="mini" @click="handleDelete(tableData.$index, tableData.row)" class="deleteArticle">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <el-pagination
                    :current-page.sync="searchContent.page"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size.sync="searchContent.limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    @current-change="FindAll"
                    @size-change="FindAll">
                </el-pagination>
            </el-col>
        </el-row>
        <publishMessage ref="publish" :parameter="parameter"></publishMessage> <!--编辑弹出框 -->
        <seeMessage ref="seePublish" :parameter="parameter"></seeMessage> <!--查看弹出框 -->
    </div>
</template>

<script>
import publishMessage from '../MessageBox/publishMessage'
import seeMessage from '../MessageBox/seeMessage'
import { findAllArticle,addArticle,updateArticle,articleDelete,allArticleSort } from '../../service/index' 
export default {
    name:'publishArticle',
    data() {
        return {
            publishDialogVisible:false,  //编辑对话框
            seePublishDialogVisible:false,  //查看对话框
            paginationMain: '', //分页信息
            parameter:{},
            searchData:{
                publisher: true,
                status: true,
                releasetime: true,
                sort: {
                    countName: allArticleSort //分类接口
                }
            },
            total:0,
            searchContent:{
                page: 1,
                limit: 10
            },
            tableData: [],
            index:'1'
        }
    },
    components:{
        publishMessage,
        seeMessage
    },
    methods: {
        search_btn: function (somedata){   //点击搜索按钮传输搜索条件
            for(var i in somedata[0]){
                this.searchContent[i] = somedata[0][i]
            }
            this.searchContent.staus = this.searchContent.status
            delete this.searchContent.status
            this.FindAll();
        },
        FindAll(){        //查询表格所有数据
            findAllArticle(this.searchContent).then(res => {
                if(res.status == 200){
                    this.tableData = res.data.data;
                    this.total = res.data.count;
                }
            }).catch(err => {

            })
        },
        handleEdit(index, row) {
            this.$refs.publish.publishDialogVisible = true;
            this.parameter = {
                title:'编辑',
                data: row,
                jumParameter : this.$route.query.jumParameter,
                fun:updateArticle,
                sort:this.searchData.sort.count
            }
        },
        handleDelete(index, row) {
            this.$confirm('删除后将不能恢复，确定要删除系统中的这条记录吗?', '删除', {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            center: true,
            customClass: 'deleteDlog',
            cancelButtonClass: 'closeMessage',
            confirmButtonClass: 'DetermineMessage',
            }).then(() => {
                articleDelete({id: row.id}).then(res => {
                    if(res.status == 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.FindAll();
                    }
                }).catch( err => {
                    
                })
            this.tableData.splice(index,1);
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
            });
        },
        handleSee(index, row){
            this.$refs.seePublish.seePublishDialogVisible = true;
            this.parameter = {
                title:'查看',
                data: row,
                jumParameter : this.$route.query.jumParameter,
                sort:this.searchData.sort.count
            }
        },
        publish_btn(){
            this.$refs.publish.publishDialogVisible = true;
            this.parameter = {
                title:'发布文章',
                data: '' ,
                jumParameter : this.$route.query.jumParameter,
                fun:addArticle,
                sort:this.searchData.sort.count
            }
        },
        DetermineBtn(){
            
        }
    },
    beforeMount(){
        this.FindAll();
        allArticleSort().then(res => {
            this.searchData.sort.count = res.data.data;
        })
    }
}
</script>
<style lang='scss'>
    .publishArticle{
        .el-dropdown{
            color: #414142;
            border-radius: px2rem(4);
            // height: px2rem(36);
            button{
                border: none;
                background: #F0F1F5;
                padding: px2rem(11) px2rem(20);
                border-radius: px2rem(2) !important;
            }
        }
        .search_warp{
            .el-input__inner{
                width: px2rem(140) !important; 
                background: #F0F1F5;
                border-bottom: none !important;
                position: relative;
                border: none;
            }
        }
        .publishTime {
            display: inline-block;
            margin-left: px2rem(60);
            font-size: px2rem(14);
            color: #414142;
            .el-input__inner{
                width:px2rem(180) !important; 
            }
        }
        .searchContent{
            display: inline-block;
            font-size: px2rem(14);
            color:#414142;
            margin-left: px2rem(60);
            .el-input__inner{
                padding-left: px2rem(9) !important;
            }
        }
        
        .searchContentOne{
            margin-left: 0;
            .el-input__inner{
                width: px2rem(80) !important;
            }
        }
        // .el-input{
        //     display: inline;
        //     .el-input__inner{
        //         width:px2rem(140) !important; 
        //         padding-left: 9px !important;
        //         padding: 0px;
        //         height: px2rem(36);
        //         background: #F0F1F5;
        //         border-radius: px2rem(2);
        //         color: #AFB0B3;
        //         border-bottom: none !important;
        //     }
        // }
        
    }
</style>

<style lang='scss' scoped>
    .publishArticle{
        width: px2rem(1620);
        height: px2rem(900);
        padding: px2rem(22) px2rem(22) 0 px2rem(22);
        float: left;
        .publish_btn{
            width: px2rem(120);
            height: px2rem(36);
            line-height: px2rem(36);
            background: #15BE9D;
            padding: 0px;
            color: #ffffff;
            border-radius: px2rem(18);
        }
        .tabel_warp{
            padding: px2rem(22) 0 0 px2rem(30);
            height: 100%;
            background: #ffffff;
            margin-top: px2rem(22);
            .search_warp{
                margin-bottom: px2rem(22);
            }
            .grid-content{
                display: inline-block;
                .el-table__header{
                    padding-left: px2rem(31);
                    .cell{
                        text-align: center !important;
                    }
                }
                @mixin articleBtn(){
                    color: #ffffff;
                    border: none;
                    padding: 7px 17px;
                }
                .editArticle{
                    background: #547BE8;
                    @include articleBtn();
                }
                .seeArticle{
                    background: #15BE9D;
                    float: left;
                    @include articleBtn();
                }
                .deleteArticle{
                    background: #F52653;
                    float: right;
                    @include articleBtn();
                }
            }
            .editor{
                margin-left: px2rem(10);
            }
            .search_btn{
                width: px2rem(80);
                background: #547BE8;
                color: #ffffff;
            }
        }
        
    }
</style>