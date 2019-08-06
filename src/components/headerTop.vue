<template>
    <div class="header_top">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#547BE8" text-color="#ffffff">
            <div class="logo_warp">
                <img src="../assets/images/LOGO.png" alt="">
            </div>
            <el-menu-item index="/home" title="1">首页</el-menu-item>
            <el-menu-item index="/articleIndex">文章</el-menu-item>
            <el-menu-item index="/videoIndex">视频</el-menu-item>
            <el-menu-item index="/noticeIndex">公告</el-menu-item>
            <el-menu-item index="/advertIndex">广告</el-menu-item>
            <el-menu-item index="/healthIndex">公共卫生</el-menu-item>
            <el-menu-item index="/userIndex">用户</el-menu-item>
            <div class="login_info_warp">
                <span>欢迎您，卫计委管理员~</span>
                <div :class="['login_info_main', isAccount ? 'account' : '']" @mousemove="account" @mouseout="noAccount">
                    <span v-show="isAccount" class="outLogin">退出登录</span>
                    <span v-show="isAccount" class="modifyPw">修改密码</span>
                    <div class="userInfo">
                        <img src="../assets/icon/user.png" alt="">
                        <span>账号</span>
                    </div>
                </div>
            </div>
        </el-menu>
    </div>
</template>

<script>
import bus from '../assets/eventBus'
export default {
    name:'header_top',
    data() {
        return {
            activeIndex: '/home',
            isAccount: false,
        }
    },
    methods:{
        handleSelect(key, keyPath){
            this.$router.push(key)
            sessionStorage.setItem('headerTopDefault',key);
            bus.$emit("user",key)
        },
        account(){
            this.isAccount = true;
        },
        noAccount(){
            this.isAccount = false;
        }
    },
    beforeMount(){
        // this.activeIndex = sessionStorage.getItem('headerTopDefault');
        let routeUrl ='/' + this.$route.path.split('/')[1];
        this.activeIndex = routeUrl 
        console.log(routeUrl)
    }
}
</script>

<style lang='scss'>
    .el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover{color:#fff !important;font-weight: 700}
    .el-menu--horizontal>.el-menu-item.is-active{color: #fff !important;border-bottom: 2px solid #FFFFFF !important;}
    .header_top{
        height: px2rem(80);
        .el-menu{
            padding: 0 px2rem(40);
            .el-menu-item{
                height: px2rem(80);
                line-height: px2rem(80);
                padding: 0 px2rem(38);
                font-size: px2rem(18);
            }
            .logo_warp{
                display: inline-block;
                float: left;
                overflow: hidden;
                height: px2rem(80);
                line-height: px2rem(80);
                padding-right: px2rem(235);
                img{
                    vertical-align: middle;
                }
            }
            .login_info_warp{
                display: inline-block;
                float: right;
                overflow: hidden;
                height: px2rem(80);
                line-height: px2rem(80);
                color: #FFFFFF;
                .login_info_main{
                    display: inline-block;
                    width: px2rem(86);
                    height: px2rem(34);
                    line-height: px2rem(34);
                    text-align: center;
                    background: #FFFFFF;
                    border-radius: px2rem(17);
                    // padding-left: px2rem(19);
                    margin-left: px2rem(20);
                    img{
                        vertical-align: middle;
                        width: px2rem(16);
                        margin-right: px2rem(4);
                    }
                    span{
                        color: $act-color;
                        vertical-align: middle;
                        font-size: px2rem(14);
                    }
                }
                .account{
                    width: px2rem(236);
                    position: absolute;
                    right: px2rem(40);
                    text-align: right;
                    padding: 0px px2rem(18);
                    top: px2rem(23);
                    display: -webkit-flex;
                    display: flex;
                    -webkit-justify-content: space-around;
                    justify-content: space-around;

                    .userInfo{
                        display: inline-block;
                    }
                }
            }
        }
    }
    
</style>