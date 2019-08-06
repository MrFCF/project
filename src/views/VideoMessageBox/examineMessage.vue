<template>
    <div class="publish">
        <el-dialog
            :title="parameter.title"
            :visible.sync="examinePublishDialogVisible"
            :close-on-click-modal="false"
            @open="handleOpen"
            center 
            width="80%">
                <el-form label-width="100px" :model="publishForm" class="publish_warp" ref="publishForm">
                    <el-form-item label="标题:" prop="title">
                        {{publishForm.title}}
                    </el-form-item>
                    <el-form-item label="文章封面图:" id="avatar-uploader">
                            <img v-if="publishForm.imageUrl" :src="publishForm.imageUrl" class="avatar">
                    </el-form-item>
                    <el-form-item label="分类:">
                        {{publishForm.sort}}
                    </el-form-item>
                    <el-form-item label="简介:">
                        {{publishForm.content}}
                    </el-form-item>
                    <el-form-item label="视频:" class="rich_text uploadVideo_warp">
                        <video :src="this.publishForm.url" style="width:500px;height:300px;" controls="controls"></video>
                    </el-form-item>
                     <el-form-item label="内容:" class="rich_text">
                        <el-input v-model="oppose" placeholder="请输入驳回原因"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="rejectBtn" class="rejectMessage">驳回</el-button>
                    <el-button type="primary" @click="adoptBtn" class="DetermineMessage">通过</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>
import { reviewVideo,selectById } from '../../service/index'
export default {
    name:'publish',
    props: ['parameter'],
    data() {
        return {
            oppose:'', //驳回原因
            examinePublishDialogVisible:false,
            publishForm: {
                title: '',
                sort: '',
                imageUrl: '',
                content: '',
                url: '',
                videoType: ''
            },
        }
    },
    methods:{
        FindId(){
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
                if(res.data.data.videoType == '本地视频'){
                    this.publishForm.url = 'http://' + res.data.data.video;
                }else{
                    this.publishForm.url = res.data.data.url;
                }
            })
        },
        rejectBtn(){
            if(this.oppose){
                var data = {
                    id: this.parameter.data.id,
                    oppose:this.oppose
                }
                reviewVideo(data).then( res => {
                    if(res.data.code == 200){
                        this.$message.success(res.data.message);
                        this.$parent.FindAll();
                    }else{
                        this.$message.error(res.data.message);
                    }
                    this.examinePublishDialogVisible = false;
                })
            }else{
                this.$message.error("请输入驳回原因")
            }
        },
        adoptBtn(){
            reviewVideo({id:this.parameter.data.id}).then( res => {
                if(res.data.code == 200){
                    this.$message.success(res.data.message);
                    this.$parent.FindAll();
                }else{
                    this.$message.error(res.data.message);
                }
            })
            this.examinePublishDialogVisible = false;
        },
        handleOpen(){
            // console.log(this.parameter)
            this.FindId();
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
  #avatar-uploader .avatar{
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