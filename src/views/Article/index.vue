<template>
    <div class="articleMain">
        <left-tree></left-tree>
        <router-view/>
    </div>
</template>

<script>
export default {
    name:'articleMain',
    data() {
        return {
        }
    }
}
</script>

<style lang='scss' scoped>
    .articleMain{
        width: 100%;
        height: 100%;
        .leftTree{
            // height: 100%;
        }
    }
</style>