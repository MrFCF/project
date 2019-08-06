<template>
    <div class="publish">
        <el-dialog
            :title="parameter.title"
            :visible.sync="addClassDialogVisible"
            :close-on-click-modal="false"
            center
            @open="handleOpen"
            width="80%">
                <el-form label-width="100px" :model="publishForm" class="publish_warp" ref="publishForm" :rules="publishRule">
                    <el-form-item label="分类名称:" prop="sortName">
                        <el-input v-model="publishForm.sortName" placeholder="请输入分类名称"></el-input>
                    </el-form-item>
                </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addClassDialogVisible = false" class="closeMessage">取 消</el-button>
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
            addClassDialogVisible:false,
            publishForm:{
                sortName:''
            },
            publishRule:{
                sortName: [
                    { required: true, message: '请输入分类名称', trigger: 'blur' },
                ]
            }
        }
    },
    methods:{
        DetermineBtn() {
            let vm = this;
            this.$refs['publishForm'].validate((valid) => {
                if (valid) {
                    this.parameter.fun(this.publishForm).then( res => {
                        if(res.data.code == 200){
                            this.$message.success(res.data.message)
                            this.$parent.FindAll();
                        }
                    }).catch( err => {

                    })
                    this.addClassDialogVisible = false //关闭弹框
                } else {
                    this.$message({
                        message: '内容不能为空',
                        type: 'warning'
                    });
                    return false;
                }
            });
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
                this.publishForm = this.parameter.data
                console.log(this.publishForm)
            }else{
                this.publishForm = {
                    sortName:''
                }
            }
        }
    }
}
</script>