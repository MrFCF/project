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
                    <el-form-item label="文章封面图:" prop="imageUrl">
                        <el-input v-model="publishForm.imageUrl" v-if="false"></el-input>
                        <el-upload
                                id="avatar-uploader"
                                ref="uploadImg"
                                :show-file-list="false"
                                :action="action"
                                :on-change="handleChange"
                                :auto-upload="false"
                                :on-success="ImageSuc"
                                :data="publishForm"
                                name="image">
                            <img v-if="publishForm.imageUrl" :src="publishForm.imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="分类:" prop="sort">
                        <el-select v-model="publishForm.sort" placeholder="请选择分类">
                            <el-option v-for="(item,index) in sort" :key="index" :label="item.sortName" :value="item.sortName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="简介:" prop="content">
                        <el-input v-model="publishForm.content" placeholder="请输简介"></el-input>
                    </el-form-item>
                    <el-form-item label="视频:" class="rich_text uploadVideo_warp">
                        <template>
                            <el-select v-model="publishForm.videoType" placeholder="请选择分类" class="videoType">
                                <el-option label="本地视频" value="本地视频"></el-option>
                                <el-option label="视频链接" value="视频链接"></el-option>
                            </el-select>
                            <el-upload
                            class="upload-demo uploadVideo"
                            :action="actionVideo"
                            :limit="1"
                            ref="uploadVideo"
                            v-show="publishForm.videoType == '本地视频'"
                            :on-change="videoHandleChange"
                            :auto-upload="false"
                            accept=".mp4"
                            :data="videoIdCommit"
                            name="video"
                            :on-success="VideoSuc">
                            <el-button>上传</el-button>
                        </el-upload> 
                            <el-input v-show="publishForm.videoType == '视频链接'" v-model="publishForm.url" placeholder="请输入视频链接" class="uploadVideoURL"></el-input>
                        </template>
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
import { allSort,releaseVideo,videoUpload,selectById } from '../../service/index'
export default {
    name:'publish',
    props: ['parameter'],
    data() {
        return {
            sort:[], //视频分类
            file:null,
            publishDialogVisible:false,
            action: releaseVideo(), //文章提交的地址
            actionVideo: videoUpload(), //文章提交的地址
            publishForm: {
                title: '',
                sort: '',
                imageUrl: '',
                content: '',
                url: '',
                videoType: ''
            },
            videoIdCommit:{
                id:''
            },
            publishRule:{
                title:[
                    { required: true, message: '请输入标题', trigger: 'blur' }
                ],
                imageUrl:[
                    { required: true, message: '请输入封面', trigger: 'blur' }
                ],
                type:[
                    { required: true, message: '请选择分类', trigger: 'blur' }
                ],
                content:[
                    { required: true, message: '简介不能为空', trigger: 'blur' }
                ],

            }
        }
    },
    methods:{
        DetermineBtn() {
            let vm = this;
            this.$refs['publishForm'].validate((valid) => {
                if (valid) {
                    delete this.publishForm.imageUrl;
                    vm.$refs.uploadImg.submit();
                } else {
                    this.$message({
                        message: '内容不能为空',
                        type: 'warning'
                    });
                    return false;
                }
            });
        },
        handleChange (file, fileList) {
            this.publishForm.imageUrl = URL.createObjectURL(file.raw);
        },
        handleOpen(){
            if(this.parameter){
                var data = {
                    id:this.parameter.data.id
                }
                selectById(data).then(res => {
                    this.publishForm.title = res.data.data.title;
                    // this.publishForm.releasename = this.parameter.data.releasename;
                    this.publishForm.sort = res.data.data.sort;
                    this.publishForm.imageUrl = 'http://' + res.data.data.tphoto;
                    this.publishForm.content = res.data.data.content;
                    this.publishForm.id = res.data.data.id;
                    this.publishForm.videoType = res.data.data.videoType;
                    if(res.data.data.videoType == '本地视频'){
                        this.publishForm.url = 'http://' + res.data.data.video;
                    }else{
                        this.publishForm.url = res.data.data.url;
                    }
                    this.publishForm.videoType = '视频链接'
                })
            }
        },
        videoHandleChange(file, fileList){
            // 上传视频
        },
        ImageSuc(res){
            if(this.publishForm.videoType == '本地视频'){
                this.videoIdCommit.id = res.data;
                this.$refs.uploadVideo.submit();    
            }
        },
        VideoSuc(res){
            if(res.code == 200){
                this.$message.success(res.message);
            }
            this.publishDialogVisible = false //关闭弹框
        }
    },
    beforeMount(){
        allSort().then(res => {
             this.sort = res.data.data
        })
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
                width: 80% !important;
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
        .videoType{
            width: 20% !important;
            margin-right: 1%;
        }
        .uploadVideo_warp{
            .el-form-item__content{
                .uploadVideo{
                    width: 80%;
                    // float: left;
                    button{
                        width: 80px;
                        background: #547BE8;
                        color: #ffffff;
                        padding: 10px 20px;
                        border-radius: 2px;
                        border: none;
                    }
                }
                .uploadVideoURL{
                    width: 74% !important;
                }
                .videoType{
                    float: left;
                }
            }
            
        }
        
    }

</style>

<style lang='scss' scoped>
</style>