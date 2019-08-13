<template>
    <div class="publish">
        <el-dialog
            :title="parameter.title"
            :visible.sync="publishDialogVisible"
            :close-on-click-modal="false"
            center 
            @open="handleOpen"
            width="80%">
                <el-form label-width="100px" :model="publishForm" class="publish_warp" ref="publishForm" :rules="publishRule">
                    <el-form-item label="名称:" prop="servicename">
                        <el-input v-model="publishForm.servicename" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <el-form-item label="服务有效期:" prop="servicetime">
                        <el-input class="small_el_input" v-model="publishForm.servicetime" placeholder="请输入有效期"></el-input>年
                    </el-form-item>
                    <el-form-item label="价格:" prop="price">
                        <el-input class="small_el_input" v-model="publishForm.price" placeholder="请输入价格"></el-input>元
                    </el-form-item>
                    <el-form-item label="类别:" prop="sort">
                        <el-radio-group v-model="publishForm.sort">
                            <el-radio label="公卫包"></el-radio>
                            <el-radio label="基础包"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="内容:" class="rich_text" prop="content">
                        <!-- vue-ueditor-wrap -->
                        <vue-ueditor-wrap v-model="publishForm.content" :config="myConfig"></vue-ueditor-wrap>
                    </el-form-item>
                </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="publishDialogBtn = false" class="closeMessage">取 消</el-button>
                <el-button type="primary" @click="DetermineBtn" class="DetermineMessage">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// import { updatePackage,addPackage } from "../../service/index"
export default {
    name:'publish',
    props: ['parameter'],
    data() {
        return {
            publishDialogVisible:false,
            action: '', //文章提交的地址
            publishForm: {
                servicename: '',
                servicetime: '',
                price: '',
                content: '',
                sort: '公卫包',
                isUse: false
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
                servicename:[
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                servicetime:[
                    { required: true, message: '请输入有效期', trigger: 'blur' }
                ],
                price:[
                    { required: true, message: '请输入价格', trigger: 'blur' }
                ],
                sort:[
                    { required: true, message: '请选择类别', trigger: 'blur' }
                ],
                content:[
                    { required: true, message: '内容不能为空', trigger: 'blur' }
                ]

            }
        }
    },
    methods:{
        DetermineBtn() {
            let vm = this;
            this.$refs['publishForm'].validate((valid) => {
                if (valid) {
                    this.parameter.fun(this.publishForm).then(res => {
                        if(res.data.code == 200) {
                            this.$message.success(res.data.message)
                            this.$parent.FindAll();
                        }else{
                            this.$message.error(res.data.message)
                        }
                    })
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
        handleOpen(){
            if(this.parameter.data){
                this.publishForm = this.parameter.data
            }else{
                this.publishForm = {
                    servicename: '',
                    servicetime: '',
                    price: '',
                    content: '',
                    sort: '公卫包',
                    isUse: false
                }
            }
        }
    }
}
</script>

<style lang="scss">
    .small_el_input{
        width: 20%;
        .el-input__inner{
            width: 95% !important;
        }
    }
</style>
