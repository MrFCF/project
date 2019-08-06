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
                        <el-table-column prop="releasetime" label="发布日期" width="165" align="center">
                            <template slot-scope="tableData">
                                <span>{{tableData.row.releasetime | moment}}</span>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column prop="releasename" label="编辑人" width="86" align="center">
                        </el-table-column> -->
                        <el-table-column prop="status" label="状态" width="88" align="center">
                            <template slot-scope="tableData">
                                <font v-if="tableData.row.status == 1" color='#547BE8'>待审核</font>
                                <font v-else-if="tableData.row.status == 2" color='#15BE9D'>已发布</font>
                            </template>
                        </el-table-column>
                        <el-table-column prop="reviewname" label="审核人" width="98" align="center">
                        </el-table-column>
                        <el-table-column prop="address" label="操作" width="90" align="center">
                            <template slot-scope="tableData">
                                <el-button v-show="tableData.row.status == 2" size="mini" @click="handleSee(tableData.$index, tableData.row)" class="seeArticle">查看</el-button>
                                <el-button v-show="tableData.row.status == 1" size="mini" type="danger" @click="handleArticle(tableData.$index, tableData.row)" class="examineArticle">审核</el-button>
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
        <examineMessage ref="examineMessage" :parameter="parameter"></examineMessage> <!--审核弹出框 -->
        <seePublish ref="seePublish" :parameter="parameter"></seePublish> <!--查看弹出框 -->
    </div>
</template>

<script>
import { findMessageAutid,findByIdAutidMessage } from '../../service/index'
import examineMessage from '../NoticeMessageBox/examineMessage'
import seePublish from '../NoticeMessageBox/seeMessage'
export default {
    name:'publishArticle',
    data() {
        return {
            examinePublishDialogVisible:false,  //审核对话框
            seePublishDialogVisible:false,  //查看对话框
            parameter:{}, //弹出框传输的数据
            searchData:{
                publisher: true,
                status: true,
                releasetime: true
            }, //搜索组件
            tableData: [],   //表格数据
            total: 0,        //数据总条数
            searchContent:{   //搜索分页默认值
                page: 1,
                limit: 10
            },
            index:'1'
        }
    },
    components:{
        examineMessage,
        seePublish
    },
    methods: {
        search_btn: function (somedata){   //点击搜索按钮传输搜索条件
            this.searchContent = somedata[0]
            this.FindAll();
        },
        FindAll(){
            findMessageAutid(this.searchContent).then(res=> {
                this.tableData = res.data.data
                this.total = res.data.count
            }).catch(err => {

            })
        },
        handleArticle(index, row) {   //审核公告
            this.$refs.examineMessage.examinePublishDialogVisible = true;
            this.parameter = {
                title:'审核',
                messageContent: row
            }
            // findByIdAutidMessage({id : row.id}).then(res => {
            //     this.parameter = {
            //     title:'审核',
            //     messageContent: row,
            //     jumParameter : this.$route.query.jumParameter,
            //     data:res.data
            // }
            // this.$refs.examineMessage.examinePublishDialogVisible = true;
            // }).catch(err => {

            // })
        },
        handleSee(index, row){
            findByIdAutidMessage({id : row.id}).then(res => {
                this.parameter = {
                title:'查看',
                messageContent: row,
                jumParameter : this.$route.query.jumParameter,
                data:res.data
            }
            this.$refs.seePublish.seePublishDialogVisible = true;
            }).catch(err => {

            })
        }
    },
    mounted(){
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
                .examineArticle{
                    background: #547BE8;
                    @include articleBtn();
                    margin-left: 0px;
                }
                .seeArticle{
                    background: #15BE9D;
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