<template>
    <div class="publish">
        <el-dialog
            :title="parameter.title"
            :visible.sync="seePublishDialogVisible"
            :close-on-click-modal="false"
            center 
            @open="handleOpen"
            width="80%">
            <el-form label-width="100px" :model="publishForm" class="publish_warp" ref="publishForm">
                <el-form-item label="标题:">
                    <span v-text="publishForm.pactname"></span>
                </el-form-item>
                <!-- <el-form-item label="发布单位/人:">
                    <span v-text="publishForm.releasename"></span>
                </el-form-item> -->
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
                pactname: '',
                // releasename: '',
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
        handleOpen(){
            if(this.parameter.data){
                this.publishForm = this.parameter.data
            }else{
                this.publishForm = {
                    pactname: '',
                    // releasename: '',
                    content: ''
                }
            }
        }
    }
    
}
</script>