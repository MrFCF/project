<template>
    <div class="videoMain">
        <left-tree></left-tree>
        <router-view/>
    </div>
</template>

<script>
export default {
    name:'videoMain',
    data() {
        return {
        }
    }
}
</script>

<style lang='scss' scoped>
    .videoMain{
        width: 100%;
        height: 100%;
    }
</style>