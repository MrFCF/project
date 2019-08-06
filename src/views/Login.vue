<template>
    <div class="login">
        <div class="Logo">
            <img src="@/assets/images/LOGO.png" alt="">
        </div>
        <el-row>
            <el-col :span="16" :offset="4">
                <div class="login_img">
                    <img src="@/assets/images/login/left.png" alt="">
                </div>
                <div class="login-warp">
                    <h3 class="login_title">用户登录</h3>
                    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" >
                        <el-form-item prop="username">
                            <el-input v-model="loginForm.username" placeholder="请输入账号" class="account"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="loginForm.password" placeholder="请输入密码" class="passWd"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="VCode" placeholder="请输入验证码" class="VCode"></el-input>
                            <div class="VCode_num">
                                <p>{{code}}</p>
                                <span @click="refresh">刷新</span>
                            </div>
                        </el-form-item>
                        <el-form-item prop="type">
                            <el-checkbox-group v-model="type">
                                <el-checkbox label="记住密码" name="type" style="color:#414142"></el-checkbox>.
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { loginPost } from '@/service/index.js'
export default {
    name:'login',
    data() {
        return {
            loginForm:{
                username:'admin',
                password: '123456',
            },
            type: '',
            VCode: '',
            code: '',
            // VCode: '',
            loginRules: {
                username:[
                    { required: true, message: '请输入账号', trigger: 'blur' },
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    mounted(){
        this.createCode();
        if(localStorage.getItem('loginForm')){
            let loginObj = JSON.parse(localStorage.getItem('loginForm'));
            this.loginForm.username = loginObj.username;
            this.loginForm.password = loginObj.password;
            this.type = loginObj.type;
        }
    },
    methods:{
        refresh(){
            this.createCode();
            this.VCode = '';
            // 刷新验证码;
        },
        createCode(){
            this.code = ''
            let codeLength = 4;
            let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D','E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q','R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');// 随机数
            for (var i = 0; i < codeLength; i++) {// 循环操作
                var index = Math.floor(Math.random() * 36);// 取得随机数的索引（0~35）
                this.code += random[index];// 根据索引取得随机数加到code上
            }
        },
        // 记住密码
        remember(){
            localStorage.setItem('loginForm',JSON.stringify(this.loginForm))
        },
        // 登录
        submitForm(loginForm){
            let vm = this;
            this.$refs[loginForm].validate((valid) => {
                if (valid) {
                    let inputCode = this.VCode.toUpperCase()
                    if(inputCode != this.code){
                        this.$message.error('验证码错误'); // 弹出验证码输入错误
                        this.createCode();
                        this.VCode = '';
                        return;
                    }else if(this.code == ""){
                        this.$message.error('验证码不能为空'); // 弹出验证码不能为空
                        this.createCode();
                        return;
                    }else{
                        // 登录接口 
                        loginPost(this.loginForm).then(res => {
                            sessionStorage.setItem('LoginUser',JSON.stringify(res))
                            if(vm.type){
                                vm.remember();
                            }
                            if( res.data.code == 200){
                                this.$message.success('登录成功')
                                this.$router.push('/home')
                            }
                        }).catch( err => {
                            this.$message.error(err)
                        })

                    }
                } else {
                    this.$message.error('登陆失败');
                    return false;
                }
            });
        }
    }
}
</script>


<style lang='scss' scoped>
    .login{
        background: url('../assets/images/login/login_background.png');
        width:100%;
        height: 100%;
        .Logo{
            padding: px2rem(36) 0 0 px2rem(40);
        }
        .el-row{
            margin-top: px2rem(94);
            .el-col{
                background: #ffffff;
                height: px2rem(670);
                display: -webkit-flex;
                display: flex;
                -webkit-justify-content: space-around;
                justify-content: space-around;
                align-items: center;
                .login-warp{
                    height: px2rem(414);

                    .login_title{
                        text-align: center;
                        font-size: px2rem(30);
                        color: #414142;
                    }
                    .el-form{
                        margin-top: px2rem(60);
                        .el-input::before{
                            content: '';
                            position: absolute;
                            left: px2rem(17);
                            bottom: px2rem(10); 
                        }
                        .account::before{
                            background: url('../assets/images/login/account.png') no-repeat;
                            width: px2rem(20);
                            height: px2rem(20);
                        }
                        .passWd::before{
                            background: url('../assets/images/login/passWd.png') no-repeat;
                            width: px2rem(18);
                            height: px2rem(23);
                        }
                        .VCode_num{
                            cursor:pointer;
                            display: inline-block;
                            float: right;
                            p{
                                width: px2rem(100);
                                height: px2rem(36);
                                display: inline-block;
                                text-align: center;
                                font-size: px2rem(16);
                                letter-spacing:px2rem(5);
                                border:1px dashed #555;
                                margin-right: px2rem(9); 
                            }
                            span{
                                color: #547BE8;
                                font-size: px2rem(14);
                            }
                        }
                        .VCode::before{
                            background: url('../assets/images/login/VCode.png') no-repeat;
                            width: px2rem(20);
                            height: px2rem(22);
                        }
                        .el-button{
                            width: 100%;
                            height: px2rem(50);
                            color: #ffffff;
                            text-align: center;
                            background: #547BE8;
                            font-size: px2rem(16);
                            border-radius: px2rem(8);
                        }
                    }
                }
            }
        }
    }
</style>
<style lang="scss">
    .login{
        .el-input__inner{
            border:none !important;
            width: px2rem(360) !important;
            border-bottom: 1px solid #E6E7EB !important;
            border-radius: 0 !important;
            padding-left: px2rem(46) !important;
        }
    }
    .VCode{
        width: px2rem(200) !important;
        .el-input__inner{
            width: px2rem(200) !important;
        }
    }
</style>