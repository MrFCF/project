<template>
    <div class="publishArticle">
        <el-row class="tabel_warp">
            <el-col :span="24">
                <search v-on:search="search_btn" ref="searchComponent" :searchData="searchData"></search>
                <div class="grid-content">
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="id" label="序号" width="57" align="center">
                        </el-table-column>
                        <el-table-column prop="title" label="标题" width="118" align="center" :show-overflow-tooltip=true>
                        </el-table-column>
                        <el-table-column prop="content" label="简介" width="131" align="center" :show-overflow-tooltip=true>
                        </el-table-column>
                        <el-table-column prop="sort" label="分类" width="92" align="center">
                        </el-table-column>
                        <el-table-column prop="video" label="视频链接" width="212" align="center" :show-overflow-tooltip=true>
                        </el-table-column>
                        <el-table-column prop="releaseTime" label="发布日期" width="165" align="center">
                            <template slot-scope="tableData">
                                <span v-if="tableData.row.releaseTime">{{tableData.row.releaseTime | moment}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="status" label="状态" width="88" align="center">
                            <template slot-scope="tableData">
                                <font v-if="tableData.row.status == 1" color='#547BE8'>待审核</font>
                                <font v-else-if="tableData.row.status == 2" color='#15BE9D'>已发布</font>
                            </template>
                        </el-table-column>
                        <el-table-column prop="reviewName" label="审核人" width="98" align="center">
                        </el-table-column>
                        <el-table-column prop="top" label="是否置顶" width="150" align="center">
                            <template slot-scope="tableData">
                                <el-radio-group v-show="tableData.row.status == 2" v-model="tableData.row.top" @change="radioChange(tableData.row.id,tableData.row.top)">
                                    <el-radio :label="2">是</el-radio>
                                    <el-radio :label="1">否</el-radio>
                                </el-radio-group>
                            </template>
                        </el-table-column>
                        <el-table-column prop="address" label="操作" width="170" align="center">
                            <template slot-scope="tableData">
                                <el-button v-show="tableData.row.status == 2" size="mini" @click="handleSee(tableData.$index, tableData.row)" class="seeArticle">查看</el-button>
                                <el-button v-show="tableData.row.status == 1" size="mini" type="danger" @click="handleArticle(tableData.$index, tableData.row)" class="examineArticle">审核</el-button>
                                <el-button v-show="tableData.row.status == 2" size="mini" type="danger" @click="handleDelete(tableData.$index, tableData.row)" class="deleteArticle">删除</el-button>
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
        <examineMessage ref="examineMessage" :parameter="parameter"></examineMessage> <!--编辑弹出框 -->
        <seePublish ref="seePublish" :parameter="parameter"></seePublish> <!--查看弹出框 -->
    </div>
</template>

<script>
import { allSort,examineVideoList,toTopVideo,unTopVideo,deleteVideo,selectExamineVideoByRequired } from '../../service/index'
import examineMessage from '../VideoMessageBox/examineMessage'
import seePublish from '../VideoMessageBox/seePublishMessage'
export default {
    name:'publishArticle',
    data() {
        return {
            examinePublishDialogVisible:false,  //审核对话框
            seePublishDialogVisible:false,  //查看对话框
            parameter:{},
            total:0,
            searchData:{
                publisher: true,
                status: true,
                releasetime: true,
                sort: {
                    countName: allSort //分类接口
                }
            },
            searchContent:{
                page: 1,
                limit: 10
            },
            tableData: [],
            index:'1'
        }
    },
    components:{
        examineMessage,
        seePublish
    },
    methods: {
        search_btn: function (somedata){   //点击搜索按钮传输搜索条件
            this.searchContent = somedata[0];
            this.FindAll();
        },
        FindAll(){        //查询表格所有数据
            selectExamineVideoByRequired(this.searchContent).then( res => {
                // console.log(res);
                for (var i in res.data.data){
                    if(res.data.data[i].top > 1){
                        res.data.data[i].top = 2
                    }
                }
                this.tableData = res.data.data;
                this.total = res.data.count;
            })
        },
        handleArticle(index, row) {   //审核文章
            this.$refs.examineMessage.examinePublishDialogVisible = true;
            this.parameter = {
                title:'审核',
                data: row
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
                let data = {
                    id:row.id
                }
                deleteVideo(data).then(res => {
                    if(res.data.code == 200){
                        this.$message({
                            type: 'success',
                            message: res.data.message
                        });
                    }
                })
            
            this.tableData.splice(index,1);
            console.log(index, row);
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
            });
        },
        handleSee(index, row){
            console.log(index,row);
            this.parameter = {
                title:'查看',
                data: row
            }
            this.$refs.seePublish.seePublishDialogVisible = true;
        },
        radioChange(id,val){
            if(val > 1){
                toTopVideo({id:id}).then(res => {
                    if(res.status == 200){
                        this.$message.success('置顶成功')
                    }else{
                        this.$message.error('置顶失败')
                    }
                })
            }else{
                unTopVideo({id:id}).then(res => {
                    if(res.status == 200){
                        this.$message.success('取消置顶')
                    }else{
                        this.$message.error('取消失败')
                    }
                })
            }
        }
    },
    beforeMount(){
        this.FindAll();
    }
}
</script>

<style lang='scss' scoped>
    .publishArticle{
        width: px2rem(1620);
        height: px2rem(900);
        padding: px2rem(22) px2rem(22) 0 px2rem(22);
        float: left;
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
                .examineArticle{
                    background: #547BE8;
                    float: left;
                    @include articleBtn();
                }
                .seeArticle{
                    background: #15BE9D;
                    @include articleBtn();
                }
                .deleteArticle{
                    background: #F52653;
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