<template>
    <div class="publish">
        <el-dialog
            :title="parameter.title"
            :visible.sync="publishDialogVisible"
            :close-on-click-modal="false"
            v-if="publishDialogVisible"
            center 
            width="80%">
                <el-form label-width="100px" :model="publishForm" class="publish_warp" ref="publishForm" :rules="publishRule">
                    <el-form-item label="标题:" prop="title">
                        <el-input v-model="publishForm.title" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="发布单位/人:" prop="releasename">
                        <el-input v-model="publishForm.releasename" placeholder="请输入单位或个人"></el-input>
                    </el-form-item> -->
                    <el-form-item label="内容:" class="rich_text" prop="content">
                        <!-- vue-ueditor-wrap -->
                        <vue-ueditor-wrap v-model="publishForm.content" :config="myConfig"></vue-ueditor-wrap>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="previewBtn" @click="preview">预览</el-button>
                    </el-form-item>
                </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="publishDialogVisible = false" class="closeMessage">取 消</el-button>
                <el-button type="primary" @click="DetermineBtn" class="DetermineMessage">确 定</el-button>
            </span>
        </el-dialog>
        <preview ref="previewComponent" :publishForm="publishForm"></preview>
    </div>
</template>

<script>
import { updateMessage,addMessage } from '../../service/index'
export default {
    name:'publish',
    props: ['parameter'],
    data() {
        return {
            publishDialogVisible:false,
            action: '', //文章提交的地址
            publishForm:{
                title: "",
                // releasename: "",
                content: ""
            },
            myConfig: {
                // 编辑器不自动被内容撑高
                autoHeightEnabled: false,
                // 初始容器高度
                initialFrameHeight: 300,
                // 初始容器宽度
                initialFrameWidth: '100%',
                // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
                serverUrl: 'http://35.201.165.105:8000/controller.php',
                // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
                UEDITOR_HOME_URL: process.env.BASE_URL + 'UEditor/'
            },
            publishRule:{
                title:[
                    { required: true, message: '请输入标题', trigger: 'blur' }
                ],
                // releasename:[
                //     { required: true, message: '请输入单位或个人', trigger: 'blur' }
                // ],
                content:[
                    { required: true, message: '内容不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        // 编辑方法
        DetermineBtn() {
            let vm = this;
            this.$refs['publishForm'].validate((valid) => {
                if (valid) {
                    if(this.parameter.data){
                        updateMessage(this.publishForm).then(res => {
                            if(res.data.code == 200) {
                                this.$parent.FindAll();
                            }
                        }).catch(err => {
                            this.$message.error(err);
                        })
                    }else{
                        addMessage(this.publishForm).then(res => {
                            if(res.data.code == 200) {
                                this.$parent.FindAll();
                            }
                        }).catch(err => {
                            this.$message.error(err);
                        })
                    }
                    this.publishDialogVisible = false //关闭弹框
                } else {
                    this.$message({
                        message: '内容不能为空',
                        type: 'warning'
                    });
                    return false;
                }
            });
        },
        beforeUpload(file) {
            return true;
        },
        preview(){
            // 预览
            this.$refs['publishForm'].validate((valid) => {
                if (valid) {
                    this.$refs.previewComponent.centerDialogVisible = true;   //弹出对话框 
                } else {
                    this.$message({
                        message: '内容不能为空',
                        type: 'warning'
                    });
                    return false;
                }
            })
        },
    },
    watch:{
        parameter(){
            if(this.parameter.data){
                this.publishForm = this.parameter.data
            }else{
                this.publishForm = {
                    title: "",
                    // releasename: "",
                    content: ""
                }
            }
        }
    },
    mounted(){
        // console.log(this.parameter)
    }
}
</script>