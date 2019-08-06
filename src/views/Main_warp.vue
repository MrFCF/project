<template>
    <div class="main">
        <header-top></header-top>
        <router-view/>
    </div>
</template>

<script>
import headerTop from '../components/headerTop'
import leftTree from '../components/leftTree'
export default {
    name:'main_warp',
    data() {
        return {
        }
    },
    components:{
      headerTop,
      leftTree
    }
}
</script>

<style lang='scss' scoped>
    .main{
        height: 100%;
    }
</style>