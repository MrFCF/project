<template>
    <div class="publishArticle">
        <el-row>
            <el-button class="publish_btn" @click="addClass">添加分类</el-button>
        </el-row>
        <el-row class="tabel_warp">
            <el-col :span="24">
                <div class="grid-content">
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="id" label="序号" width="80" align="center">
                        </el-table-column>
                        <el-table-column prop="sortname" label="分类名称" width="160" align="center" :show-overflow-tooltip=true>
                        </el-table-column>
                        <el-table-column label="操作" width="170" align="center">
                            <template slot-scope="tableData">
                                <el-button size="mini" type="danger" @click="handleArticle(tableData.$index, tableData.row)" class="editArticle">编辑</el-button>
                                <el-button size="mini" type="danger" @click="handleDelete(tableData.$index, tableData.row)" class="deleteArticle">删除</el-button>
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
        <addClassMessage ref="addClassMessage" :parameter="parameter"></addClassMessage> <!--编辑弹出框 -->
    </div>
</template>

<script>
import { allArticleSort,articInsertSort,articDeleteSort,articUpdateSort } from '../../service/index'
import addClassMessage from '../MessageBox/addClassMessage'
export default {
    name:'publishArticle',
    data() {
        return {
            addClassDialogVisible:false,  //编辑对话框
            parameter:{},
            total:0,
            searchContent:{
                page: 1,
                limit: 10
            },
            tableData: [],
        }
    },
    components:{
        addClassMessage
    },
    methods: {
        FindAll(){
            allArticleSort(this.searchContent).then( res => {
                this.tableData = res.data.data
                this.total = res.data.count
            }).catch(err => {

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
                articDeleteSort({id:row.id}).then(res => {
                    if(res.status == 200){
                         this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }else{
                        this.$message({
                            type: 'error',
                            message: '删除失败!'
                        });
                    }
                })
           
            this.tableData.splice(index,1);
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
            });
        },
        handleArticle(index, row){
            this.parameter = {
                title:'编辑',
                data: row,
                fun:articUpdateSort
            }
            this.$refs.addClassMessage.addClassDialogVisible = true;
        },
        addClass(){
            this.parameter = {
                title:'添加',
                data: '',
                fun:articInsertSort
            }
            this.$refs.addClassMessage.addClassDialogVisible = true;
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
                    background: #6588EA;
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