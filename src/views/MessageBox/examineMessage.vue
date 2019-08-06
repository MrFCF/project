<template>
    <div class="publish">
        <el-dialog
            :title="parameter.title"
            :visible.sync="examineMessageDialogVisible"
            :close-on-click-modal="false"
            center 
            @open="handleOpen"
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
                 <el-form-item label="驳回内容:" class="rich_text">
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
export default {
    name:'publish',
    props:['parameter'],
    data() {
        return {
            oppose:'',   //驳回原因
            examineMessageDialogVisible: false,
            reject:{
                id: "",
                staus: "2"
            }, 
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
        rejectBtn(){
            this.reject.oppose = this.oppose;
            this.reject.staus = "3"
            this.parameter.fun(this.reject).then(res => {
                if(res.status == 200){
                    this.$message.success('驳回成功')
                    this.examineMessageDialogVisible = false;
                    this.$parent.FindAll();
                }else{
                    this.$message.error('驳回失败');
                }
            }).catch( err => {
                this.$message.error('驳回失败');
            })
            
        },
        adoptBtn(){
            console.log(this.reject)
            this.parameter.fun(this.reject).then(res => {
                if(res.status == 200){
                    this.$message.success('通过成功')
                    this.examineMessageDialogVisible = false;
                    this.$parent.FindAll();
                }else{
                    this.$message.error('通过失败');
                }
            }).catch( err => {
                this.$message.error('通过失败');
            })
            
        },
        handleOpen(){
            if(this.parameter.data){
                this.publishForm = this.parameter.data;
                this.publishForm.photo = "http://" + this.parameter.data.tphoto
                this.reject.id = this.parameter.data.id;
            }else{
                this.publishForm = {
                    title: '',
                    // releasename: '',
                    sort: '',
                    photo: '',                                                                         
                    content: ''
                }
            }
            console.log(this.publishForm)
        }

    }
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
</style>
