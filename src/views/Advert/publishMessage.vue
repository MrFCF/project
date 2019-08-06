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
                    <el-form-item label="图片:" prop="imageUrl">
                        <el-input v-model="publishForm.imageUrl" v-if="false"></el-input>
                        <el-upload
                                id="avatar-uploader"
                                ref="upload"
                                :show-file-list="false"
                                :action="action" 
                                :before-upload="beforeUpload"
                                :on-change="handleChange"
                                :auto-upload="false"
                                :data="publishForm"
                                :on-success="addSucess"
                                name="photo">  <!-- :data 提交的数据 action 提交的地址-->
                            <img v-if="publishForm.imageUrl" :src="publishForm.imageUrl" class="avatar">
                            
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="关联链接:">
                        <el-input v-model="publishForm.continuous" placeholder="关联链接"></el-input>
                    </el-form-item>
                </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="publishDialogVisible = false" class="closeMessage">取 消</el-button>
                <el-button type="primary" @click="DetermineBtn" class="DetermineMessage">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:'publish',
    props: ['parameter'],
    data() {
        return {
            publishDialogVisible:false,
            sort:[],
            publishForm: {
                title: '',
                continuous: '',
                imageUrl: ''
            },
            publishRule:{
                title:[
                    { required: true, message: '请输入标题', trigger: 'blur' }
                ],
                imageUrl:[
                    { required: true, message: '请插入图片', trigger: 'blur' }
                ]
            },
            action:''
        }
    },
    methods:{
        DetermineBtn() {
            let vm = this;
            this.$refs['publishForm'].validate((valid) => {
                if (valid) {
                    delete this.publishForm.imageUrl;
                    this.$refs.upload.submit();
                    this.publishDialogVisible = false; //关闭弹框
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
            this.publishForm.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeUpload(file) {
            return true;
        },
        handleOpen(){
            this.action = this.parameter.fun;
        },
        addSucess(res){
            if(res.code == 200){
                this.$message.success('添加成功')
                this.$parent.FindAll();
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