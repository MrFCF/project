<template>
    <div class="publish">
        <el-dialog
            :title="parameter.title"
            :visible.sync="seePublishDialogVisible"
            :close-on-click-modal="false"
            @open="handleOpen"
            center 
            width="80%">
            <el-form label-width="100px" :model="publishForm" class="publish_warp" ref="publishForm">
                <el-form-item label="标题:">
                    <span v-text="publishForm.title"></span>
                </el-form-item>
                <el-form-item label="文章封面图:">
                        <img style="width:80px;height:80px" v-if="publishForm.photo" :src="publishForm.photo" class="avatar">
                </el-form-item>
                <!-- <el-form-item label="发布单位/人:">
                    <span v-text="publishForm.releasename"></span>
                </el-form-item> -->
                <el-form-item label="分类:">
                    <span v-text="publishForm.sort"></span>
                </el-form-item>
                <el-form-item label="内容:" class="rich_text">
                    <!-- vue-ueditor-wrap -->
                    <vue-ueditor-wrap v-model="publishForm.content" :config="myConfig"></vue-ueditor-wrap>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:'publish',
    props:['parameter'],
    data() {
        return {
            seePublishDialogVisible: false,
            publishForm: {
                title: '',
                // releasename: '',
                sort: '',
                photo: '',                                                                         
                content: ''
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
        }
    },
    methods:{
        handleChange (file, fileList) {
            this.publishForm.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeUpload(file) {
            return true;
        },
        handleOpen(){
            this.publishForm = this.parameter.data
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