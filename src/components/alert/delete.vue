<template>
    <div class="delete">
        <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <span>删除后将不能恢复，确定要删除系统中的这条记录吗？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:'',
    data() {
        return {
            centerDialogVisible: false
        }
    },
    methods:{
        
    }
}
</script>

<style lang='scss' scoped>
</style>