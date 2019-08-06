<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="scss">
  @import "./assets/common.css";
  @import "./assets/public.scss";
  html,body,#app{
    width: 1920px;
    height: 100%;
    // overflow-y: hidden;
    background: #F0F1F5;
    // width: 1920px;
    // overflow: auto;
  }
</style>

