<template>
    <div class="search_warp">
        <div class="searchContent searchContentOne" v-if="searchData.publisher">
            <el-select v-model="user" placeholder="请选择" @change="resetFun">
                <el-option label="发布人" value="releasename"></el-option>
                <el-option label="审核人" value="reviewname"></el-option>
            </el-select>
        </div>
        <div class="editor searchContent" v-if="searchData.publisher">
            <el-input v-model="name" placeholder="请输入"></el-input>
        </div>
        <div class="ification searchContent" v-if="searchData.sort">
            <span>分类:</span>&nbsp;
            <el-select v-model="searchContent.sort" placeholder="请选择" @change="resetFun">
                <el-option v-for="(list,index) in sort" :key="index" :label="list.sortName" :value="list.sortName"></el-option>
            </el-select>
        </div>
        <div class="status searchContent" v-if="searchData.status">
            <span>状态:</span>&nbsp;
            <el-select v-model="searchContent.status" placeholder="请选择" @change="resetFun">
                <el-option label="全部" value=""></el-option>
                <el-option label="待审核" value="1"></el-option>
                <el-option label="已发布" value="2"></el-option>
                <el-option label="已驳回" value="3"></el-option>
                <el-option label="草稿箱" value="4"></el-option>
            </el-select>
        </div>
        <div class="publishTime block" v-if="searchData.releasetime">
            <span>发布时间:</span>&nbsp;
            <el-date-picker type="date" placeholder="选择日期时间" v-model="searchContent.releasetime" value-format="yyyy-MM-dd">
            </el-date-picker>
        </div>
        <el-button class="search_btn" @click="search_btn">查询</el-button>
    </div>
</template>

<script>
export default {
    name:'',
    props:["searchData"],
    data() {
        return {
            // 查询条件
            user: 'releasename',
            name: '',
            searchContent:{
                sort: '',
                status: '',
                releasetime: '',
                page: 1,
                limit: 10
            },
            setSearch:{

            },
            sort:{}
        }
    },
    methods:{
        search_btn(){
            let Reset = JSON.stringify(this.searchContent);
            for(var i in this.searchData){
                this.setSearch[i] = this.searchContent[i]
            }
            if(this.searchData.publisher){
                this.setSearch[this.user] = this.name || "";
                delete this.setSearch.publisher
            }
            this.setSearch.page = this.searchContent.page;
            this.setSearch.limit = this.searchContent.limit;
            this.$emit('search',[this.setSearch,this.total]);
            // 重置搜索条件
            this.searchContent = JSON.parse(Reset);
        },
        resetFun(){
            this.searchContent.page = 1;
            this.searchContent.limit = 10;
        }
    },
    beforeMount(){
        if(this.searchData.sort){
            this.searchData.sort.countName().then(res => {
                console.log(res)
                this.sort = res.data.data
            })
        }
    }
}
</script>

<style lang='scss' scoped>
    .search_warp{
        margin-bottom: px2rem(22);
        .editor{
            margin-left: 10px;
        }
    }
    .search_btn{
        width: px2rem(80);
        background: #547BE8;
        color: #ffffff;
    }
</style>