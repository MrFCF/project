<template>
    <div class="pagination">
        <el-pagination
            :current-page.sync="searchContent.page"
            :page-sizes="[10, 20, 30, 40]"
            :page-size.sync="searchContent.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @current-change="paginationActive"
            @size-change="paginationActive">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name:'pagination',
    data() {
        return {
            total: 0,
            searchContent:{
                page: 1,
                limit: 10
            },
        }
    },
    methods:{
        paginationActive(){
            this.$emit('paginationActive',[this.searchContent,this.total]);
        } 
    }
}
</script>

<style lang='scss' scoped>
</style>