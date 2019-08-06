<template>
    <div class="publishArticle">
        <el-row>
            <el-button class="publish_btn" @click="publish_btn">发布公告</el-button>
        </el-row>
        <el-row class="tabel_warp">
            <el-col :span="24">
                <search v-on:search="search_btn" ref="searchComponent" :searchData="searchData"></search>
                <div class="grid-content">
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="id" label="序号" width="57" align="center">
                        </el-table-column>
                        <el-table-column prop="title" label="标题" width="118" align="center" :show-overflow-tooltip=true>
                        </el-table-column>
                        <el-table-column prop="" label="发布日期" width="165" align="center">
                            <template slot-scope="tableData">
                                <span>{{tableData.row.releasetime | moment }}</span>
                            </template>    
                        </el-table-column>
                        <!-- <el-table-column prop="releasename" label="编辑人" width="86" align="center">
                        </el-table-column> -->
                        <el-table-column prop="status" label="状态" width="88" align="center">
                            <template slot-scope="tableData">
                                <font v-if="tableData.row.status == 1" color='#547BE8'>待审核</font>
                                <font v-else-if="tableData.row.status == 2" color='#15BE9D'>已发布</font>
                                <font v-else-if="tableData.row.status == 3" color='#F52653'>已驳回</font>
                                <font v-else-if="tableData.row.status == 4" color='#414142'>草稿箱</font>
                            </template>
                        </el-table-column>
                        <el-table-column prop="reviewname" label="审核人" width="98" align="center">
                        </el-table-column>
                        <el-table-column prop="oppose" label="驳回原因" width="173" align="center" :show-overflow-tooltip=true>
                        </el-table-column>
                        <el-table-column prop="address" label="操作" width="171" align="center">
                            <template slot-scope="tableData">
                                <el-button v-show="tableData.row.status != 1 && tableData.row.status != 2" size="mini" @click="handleEdit(tableData.$index, tableData.row)" class="editArticle">编辑</el-button>
                                <el-button v-show="tableData.row.status == 2" size="mini" @click="handleSee(tableData.$index, tableData.row)" class="seeArticle">查看</el-button>
                                <el-button v-show="tableData.row.status != 2" size="mini" @click="handleDelete(tableData.$index, tableData.row)" class="deleteArticle">删除</el-button>
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
        <publish ref="publish" :parameter="parameter"></publish> <!--编辑弹出框 -->
        <seePublish ref="seePublish" :parameter="parameter"></seePublish> <!--查看弹出框 -->
    </div>
</template>

<script>
import publish from '../NoticeMessageBox/publishMessage'
import seePublish from '../NoticeMessageBox/seeMessage';
import { messageFindAll,messageFindById,delMessage } from '../../service/index'
export default {
    name:'publishVideo',
    data() {
        return {
            publishDialogVisible:false,  //编辑对话框
            seePublishDialogVisible:false,  //查看对话框
            parameter:{},
            tableData: [],
            index:'1',
            searchData:{
                publisher: true,
                status: true,
                releasetime: true
            },
            searchContent:{   
                page: 1,
                limit: 10
            },
            total: 0
        }
    },  
    components:{
        publish,
        seePublish
    },
    methods: {
        search_btn: function (somedata){   //点击搜索按钮传输搜索条件
            this.searchContent = somedata[0]
            this.FindAll();
        },
        FindAll(){
            messageFindAll(this.searchContent).then(res => {
                this.tableData = res.data.data
                this.total = res.data.count  //总条数
            }).catch( err => {
                this.$message.error()
            })
      },
      handleEdit(index, row) {
          messageFindById({id : row.id}).then(res => {
              this.parameter = {
              title:'编辑',
              messageContent: row,
              jumParameter : this.$route.query.jumParameter,
              data:res.data
          }
          this.$refs.publish.publishDialogVisible = true;
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
            delMessage({id : row.id}).then(res => {
                if(res.data.code == 200){
                    this.total--;
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
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
      handleSee(index, row){
          messageFindById({id : row.id}).then(res => {
              this.parameter = {
              title:'查看',
              messageContent: row,
              jumParameter : this.$route.query.jumParameter,
              data:res.data
          }
          this.$refs.seePublish.seePublishDialogVisible = true;
          }).catch(err => {

          })
          
      },
      publish_btn(){
           this.$refs.publish.publishDialogVisible = true;
           this.parameter = {
              title:'发布公告',
              messageContent: '' ,
              jumParameter : this.$route.query.jumParameter
           }
      }
    },
    beforeMount(){
        this.FindAll()
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
                    background: #547BE8;
                    @include articleBtn();
                }
                .seeArticle{
                    background: #15BE9D;
                    float: left;
                    @include articleBtn();
                }
                .deleteArticle{
                    float: right;
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