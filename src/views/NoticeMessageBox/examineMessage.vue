<template>
    <div class="publish">
        <el-dialog
            :title="parameter.title"
            :visible.sync="examinePublishDialogVisible"
            :close-on-click-modal="false"
            center
            width="80%">
            <el-form label-width="100px" class="publish_warp" :model="examineForm" ref="examineForm" :rules="rules">
                <el-form-item label="标题:">
                    <span v-text="publishForm.messageContent.title"></span>
                </el-form-item>
                <!-- <el-form-item label="发布单位/人:">
                    <span v-text="publishForm.messageContent.releasename"></span>
                </el-form-item> -->
                <el-form-item label="发布时间:">
                    <span>{{publishForm.messageContent.releasetime | moment}}</span>
                </el-form-item>
                <el-form-item label="内容:" class="rich_text">
                    <!-- vue-ueditor-wrap -->
                    <vue-ueditor-wrap v-model="publishForm.messageContent.content" :config="myConfig"></vue-ueditor-wrap>
                </el-form-item>
                 <el-form-item label="驳回原因:" class="rich_text" prop="oppose">
                    <el-input v-model="examineForm.oppose" placeholder="请输入驳回原因"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="rejectBtn('examineForm')" class="rejectMessage">驳回</el-button>
                <el-button type="primary" @click="adoptBtn" class="DetermineMessage">通过</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { autidMessage } from "../../service/index"
export default {
    name:'publish',
    props:["parameter"],
    data() {
        return {
            examineForm:{
                oppose: '',
            },
            reject:{
                id: ""
            },   //驳回原因
            examinePublishDialogVisible: false,
            publishForm: {
                title: "",
                messageContent:{
                    title: "",
                    // releasename: "",
                    releasetime: "",
                    content: ""
                }
            },
            myConfig: {
                // 编辑器不自动被内容撑高
                autoHeightEnabled: false,
                // 初始容器高度
                initialFrameHeight: 450,
                // 初始容器宽度
                initialFrameWidth: '100%',
                // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
                serverUrl: 'http://35.201.165.105:8000/controller.php',
                // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
                UEDITOR_HOME_URL: process.env.BASE_URL + 'UEditor/'
            },
            rules:{
                oppose:{required: true, message: '请输入驳回原因',trigger: 'blur'}
            }
        }
    },
    methods:{
        beforeUpload(file) {
            return true;
        },
        // 驳回
        rejectBtn(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    this.reject.status = 3;
                    this.reject.oppose = this.examineForm.oppose;
                    autidMessage(this.reject).then( res => {
                        this.$message({
                            message: '文章已驳回',
                            type: 'success'
                        });
                        this.$parent.FindAll();
                    })
                    this.examinePublishDialogVisible = false;
                }else{
                    return false;
                }
            })
        },
        // 通过
        adoptBtn(){
            this.reject.status = 2,
            autidMessage(this.reject).then( res => {
                this.$message({
                    message: '文章已通过',
                    type: 'success'
                });
                this.$parent.FindAll();
            })
            this.examinePublishDialogVisible = false;
        }
    },
    watch:{
        parameter(){
            if(this.parameter){
                this.publishForm.messageContent = this.parameter;
                this.reject.id = this.parameter.messageContent.id
            }else{
                this.publishForm = {
                    title: "",
                    messageContent:{
                        title: "",
                        // releasename: "",
                        releasetime: "",
                        content: ""
                    }
                }
            }
        }
    },
}
</script>

<style lang="scss">
    .rejectMessage{
        width: px2rem(120);
        border-radius: px2rem(18) !important;
        background: #F52653 !important;
        color: #ffffff !important;
        border: none !important;
        position: relative;
        right: -130px;
    }
    .publish{
        .el-form-item__label{
            font-weight: 700;
        }
    }
</style>
