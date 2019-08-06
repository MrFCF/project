<template>
    <div class="publishArticle">
        <el-row>
            <el-button class="publish_btn" @click="publish_btn">添加服务协议</el-button>
        </el-row>
        <el-row class="tabel_warp">
            <el-col :span="24">
                <div class="grid-content">
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="isPut" label="勾选使用" width="80" align="center">
                            <template slot-scope="tableData">
                                <el-checkbox-group v-model="tableData.row.isPut" @change="handleCheckedChange(tableData.$index, tableData.row)">
                                    <el-checkbox label="" name="type"></el-checkbox>
                                </el-checkbox-group>
                            </template>
                        </el-table-column>
                        <el-table-column prop="id" label="序号" width="80" align="center">
                        </el-table-column>
                        <el-table-column prop="pactname" label="协议名称" width="160" align="center" :show-overflow-tooltip=true>
                        </el-table-column>
                        <!-- <el-table-column prop="releasename" label="发布人/单位" width="95" align="center">
                        </el-table-column> -->
                        <el-table-column prop="address" label="操作" width="170" align="center">
                            <template slot-scope="tableData">
                                <el-button size="mini" @click="handleSee(tableData.$index, tableData.row)" class="seeArticle">查看</el-button>
                                <el-button size="mini" @click="handleEdit(tableData.$index, tableData.row)" class="editArticle">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!-- <el-pagination
                    :current-page.sync="searchContent.page"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size.sync="searchContent.limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="count"
                    @current-change="FindAll"
                    @size-change="FindAll">
                </el-pagination> -->
            </el-col>
        </el-row>
        <publishMessage ref="publish" :parameter="parameter"></publishMessage> <!--编辑弹出框 -->
        <seeMessage ref="seePublish" :parameter="parameter"></seeMessage> <!--查看弹出框 -->
    </div>
</template>

<script>
import { findPact,updatePact,addPact,pactUse} from "../../service/index"
import publishMessage from '../HealthMessageBox/publishMessageArg'
import seeMessage from '../HealthMessageBox/seeMessageArg'
export default {
    name:'publishArticle',
    data() {
        return {
            publishDialogVisible:false,  //编辑对话框
            seePublishDialogVisible:false,  //查看对话框
            paginationMain: '', //分页信息
            parameter:{},
            tableData:[],
            count:0,
            searchContent:{
                page: 1,
                limit: 10
            },
            index:'1'
        }
    },
    components:{
        publishMessage,
        seeMessage
    },
    methods: {
        FindAll(){
            findPact(this.searchContent).then(res => {
                this.tableData = res.data.data
            })
        },
        // 勾选服务协议
        handleCheckedChange(index, row){
            let data = {
                isPut : row.isPut,
                id: row.id
            }   
            pactUse(data).then(res => {
                if(res.data.code == 200){
                    this.$message.success(res.data.data)
                }else{
                    this.$message.error(res.data.data)
                }
            })
        },
        // 编辑
        handleEdit(index, row) {
            console.log(row)
            this.$refs.publish.publishDialogVisible = true;
            this.parameter = {
                title:'编辑',
                data: row,
                jumParameter : this.$route.query.jumParameter,
                fun:updatePact
            }
        },
        handleSee(index, row){
            this.$refs.seePublish.seePublishDialogVisible = true;
            this.parameter = {
                title:'查看',
                data: row,
                jumParameter : this.$route.query.jumParameter
            }
        },
        publish_btn(){
            this.$refs.publish.publishDialogVisible = true;
            this.parameter = {
                title:'添加服务协议',
                data: '' ,
                jumParameter : this.$route.query.jumParameter,
                fun:addPact
            }
        },
        DetermineBtn(){
            
        }
    },
    mounted(){
        this.FindAll()
    },
    watch:{
        tableData(){
            for(var i = 0;i<this.tableData.length ;i++){
                if(this.tableData[i].isPut === "true"){
                    this.tableData[i].isPut = true
                }else{
                    this.tableData[i].isPut = false
                }
            }
        }
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
            // float: left;
            display: inline-block;
            // width: px2rem(140);
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