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
    },
    mounted() {
    //     var that = this
    //   //设置超时退出
    //     var lastTime = new Date().getTime();
    //     var currentTime = new Date().getTime();
    //     var timeOut = 10 * 60 * 1000; //设置超时时间： 10分
    //     document.ready = function(){
    //         /* 鼠标移动事件 */
    //         document.getElementsByTagName('html').onmouseover(function(){
    //             console.log('2222222222')
    //             lastTime = new Date().getTime(); //更新操作时间
    //         });
    //     }
    //     function testTime(){
    //         currentTime = new Date().getTime(); //更新当前时间
    //         if(currentTime - lastTime > timeOut){ //判断是否超时
    //             console.log("超时");
    //             sessionStorage.removeItem("LoginUser")
    //                 that.$router.push({
    //                 path:"/"
    //                 })
    //         }
    //     }
    //     /* 定时器  间隔1秒检测是否长时间未操作页面  */
    //     window.setInterval(testTime, 1000);

            var that = this
            var lastTime = new Date().getTime();
            var currentTime = new Date().getTime();
            var timeOut = 60 * 60 * 1000; //设置超时时间： 60分

            

            function testTime(){
                
                currentTime = new Date().getTime(); //更新当前时间
                if(currentTime - lastTime >= timeOut - 300000){ //判断是否超时  提前5分钟推出
                    console.log(currentTime)
                    window.clearInterval(testTime)
                    sessionStorage.removeItem("LoginUser")
                    that.$router.push({
                        path:"/"
                    })
                    window.clearInterval(Time1)  //清楚定时器
                    that.$message.warning('登录超时请重新登录'); 

                }
            }
            /* 定时器  间隔5分钟检测是否长时间未操作页面*/
            var Time1 = window.setInterval(testTime, 300000);
    }
}
</script>

<style lang='scss' scoped>
    .main{
        height: 100%;
    }
</style>