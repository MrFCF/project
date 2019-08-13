<template>
    <div class="articleMain">
        <left-tree></left-tree>
        <div class="publishArticle">
            <el-row>
                <el-button class="publish_btn" @click="publish_btn">添加用户</el-button>
            </el-row>
            <el-row class="tabel_warp">
                <el-col :span="24">
                    <div class="grid-content">
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column prop="id" label="序号" width="80" align="center">
                            </el-table-column>
                            <el-table-column prop="uname" label="用户昵称" width="160" align="center" :show-overflow-tooltip=true>
                            </el-table-column>
                            <el-table-column prop="username" label="登录账号" width="160" align="center" :show-overflow-tooltip=true>
                            </el-table-column>
                            <el-table-column prop="pwd" label="登录密码" width="160" align="center" :show-overflow-tooltip=true>
                            </el-table-column>
                            <el-table-column prop="district" label="所属区域" width="236" align="center" :show-overflow-tooltip=true>
                            </el-table-column>
                            <el-table-column prop="address" label="操作" width="170" align="center">
                                <template slot-scope="tableData">
                                    <el-button size="mini" @click="handleEdit(tableData.$index, tableData.row)" class="editArticle">编辑</el-button>
                                    <el-button size="mini" @click="handleDelete(tableData.$index, tableData.row)" class="deleteArticle">删除</el-button>
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
        </div>
    </div>
</template>

<script>
import publishMessage from '../UserMessageBox/publishMessage'
import { userList,delUser,modifyUser,addUser,userFindById } from '../../service/index'
export default {
    name:'articleMain',
    data() {
        return {
            publishDialogVisible:false,  //编辑对话框
            seePublishDialogVisible:false,  //查看对话框
            paginationMain: '', //分页信息
            parameter:{},
            total:0,
            searchContent:{
                page: 1,
                limit: 10
            },
            tableData: [],
            searchContent:{   
                page: 1,
                limit: 10
            },
            total: 0,
            index:'1'
        }
    },
    components:{
        publishMessage
    },
    methods: {
        FindAll(){
            userList(this.searchContent).then(res => {
                if(res.data.code == 200) {
                    this.tableData = res.data.data;
                    this.total = res.data.count;
                }
            })
        },
        handleEdit(index, row) {
            
            userFindById({id:row.id}).then(res => {
                // if(res.data.code == 200){
                    this.parameter = {
                        title:'编辑',
                        data: res.data.data,
                        jumParameter : this.$route.query.jumParameter,
                        fun:modifyUser
                    }
                    this.$refs.publish.publishDialogVisible = true;
                // }
            })
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
                delUser({id:row.id}).then(res => {
                    if(res.data.code == 200){
                        this.$message.success(res.data.message);
                    }else{
                        this.$message.error('删除失败');
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
        publish_btn(){
            this.$refs.publish.publishDialogVisible = true;
            this.parameter = {
                title:'添加用户',
                data: '' ,
                jumParameter : this.$route.query.jumParameter,
                fun:addUser
            }
        },
        DetermineBtn(){
            
        }
    },
    beforeMount(){
        this.FindAll();
    }
}
</script>

<style lang='scss' scoped>
    .articleMain{
        width: 100%;
        height: 100%;
        .leftTree{
            // height: 100%;
        }
    }
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