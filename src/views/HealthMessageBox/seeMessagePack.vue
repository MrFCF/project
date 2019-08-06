<template>
    <div class="publish">
        <el-dialog
            :title="parameter.title"
            :visible.sync="seePublishDialogVisible"
            :close-on-click-modal="false"
            center 
            width="80%"
             @open="handleOpen">
            <el-form label-width="100px" :model="publishForm" class="publish_warp" ref="publishForm">
                <el-form-item label="名称:" prop="name">
                    <span v-text="publishForm.servicename"></span>
                </el-form-item>
                <el-form-item label="服务有效期:" prop="year">
                     <span v-text="publishForm.servicetime"></span>年
                </el-form-item>
                <el-form-item label="价格:" prop="price">
                    <span v-text="publishForm.price"></span>元
                </el-form-item>
                <el-form-item label="类别:" prop="type">
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