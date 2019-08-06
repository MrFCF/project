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
                    <el-form-item label="标题:" prop="title">
                        <el-input v-model="publishForm.title" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item label="文章封面图:" prop="photo">
                        <el-input v-model="publishForm.photo" v-if="false"></el-input>
                        <el-upload
                                id="avatar-uploader"
                                ref="upload"
                                :show-file-list="false"
                                :action="action" 
                                :before-upload="beforeUpload"
                                :on-change="handleChange"
                                :auto-upload="false"
                                :data="publishForm"
                                name="photo">  <!-- :data 提交的数据 action 提交的地址-->
                            <img v-if="publishForm.photo" :src="publishForm.photo" class="avatar">
                            
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <!-- <el-form-item label="发布单位/人:" prop="releasename">
                        <el-input v-model="publishForm.releasename" placeholder="请输入单位或个人"></el-input>
                    </el-form-item> -->
                    <el-form-item label="分类:" prop="sort">
                        <el-select v-model="publishForm.sort" placeholder="请选择分类">
                        <el-option v-for="(list,index) in sort" :key="index" :label="list.sortname" :value="list.sortname"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="内容:" class="rich_text" prop="content">
                        <!-- vue-ueditor-wrap -->
                        <vue-ueditor-wrap v-model="publishForm.content" :config="myConfig"></vue-ueditor-wrap>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="previewBtn" @click="preview">预览</el-button>
                        <el-button class="saveDraftBtn" @click="saveDraft">存为草稿</el-button>
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
import { addArticleUrl } from '../../service/index'
export default {
    name:'publish',
    props: ['parameter'],
    data() {
        return {
            publishDialogVisible:false,
            isTrue: false,  //是否填写完成，用来判断是否关闭messagBox框
            action: addArticleUrl(), //文章提交的地址
            sort:[],
            publishForm: {
                title: '',
                // releasename: '',
                sort: '',                                                               
                content: '',
                photo: ''
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
                photo:[
                    { required: true, message: '请插入封面', trigger: 'blur' }
                ],
                // releasename:[
                //     { required: true, message: '请输入单位或个人', trigger: 'blur' }
                // ],
                sort:[
                    { required: true, message: '请选择分类', trigger: 'blur' }
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
                    this.$refs.upload.submit();
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
        handleChange (file) {
            this.publishForm.photo = URL.createObjectURL(file.raw);
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
        saveDraft(){
            // 存为草稿

        },
        handleOpen(){
            if(this.parameter.data){
                this.publishForm.title = this.parameter.data.title;
                // this.publishForm.releasename = this.parameter.data.releasename;
                this.publishForm.sort = this.parameter.data.sort;
                this.publishForm.photo = this.parameter.data.tphoto;
                this.publishForm.content = this.parameter.data.content;
                this.publishForm.id = this.parameter.data.id;
                this.sort = this.parameter.sort
            }else{
                this.publishForm = {
                    title: '',
                    // releasename: '',
                    sort: '',
                    photo: '',                                                                         
                    content: ''
                }
                this.sort = this.parameter.sort
            }
            
        }
    }
}
</script>
<style>
  #avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  #avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  #avatar-uploader .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px !important;
    text-align: center;
  }
  #avatar-uploader .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
</style>
<style lang='scss'>
    .publish{
        .publish_warp{
            .el-input__inner{
                height: px2rem(36) !important;
                width: 80%;
            }
            .el-select{
                width: 80%;
                .el-input__inner{
                    width: 100% !important;
                }
            }
        }
        .rich_text{
            .el-form-item__content{
                line-height: 20px !important;
            }
        }
        .el-message-box__btns{
            button:nth-child(1){
                background: #15BE9D !important;
            }
        }
        .previewBtn{
            background: #547BE8;
            color: #ffffff;
            font-size: px2rem(14);
            width: px2rem(80);
            padding: 0;
            line-height: px2rem(36);
            height: px2rem(36);
        }
        .saveDraftBtn{
            background: #F0F1F5;
            color: #707073;
            font-size: px2rem(14);
            width: px2rem(80);
            padding: 0;
            line-height: px2rem(36);
            height: px2rem(36);
        }
    }

</style>

<style lang='scss' scoped>
</style>