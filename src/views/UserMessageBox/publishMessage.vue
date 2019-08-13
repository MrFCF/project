<template>
    <div class="user_publish">
        <el-dialog
            :title="parameter.title"
            :visible.sync="publishDialogVisible"
            :close-on-click-modal="false"
            center
            @open="handleOpen"
            width="80%">
                <el-form label-width="100px" :model="publishForm" class="publish_warp" ref="publishForm" :rules="publishRule">
                    <el-form-item label="用户昵称:" prop="uname">
                        <el-input v-model="publishForm.uname" placeholder="请输入用户昵称"></el-input>
                    </el-form-item>
                    <el-form-item label="登录账户:" prop="username">
                        <el-input v-model="publishForm.username" placeholder="请输入登录账户"></el-input>
                    </el-form-item>
                    <el-form-item label="登录密码:" prop="pwd">
                        <el-input v-model="publishForm.pwd" placeholder="请输入登录密码"></el-input>
                    </el-form-item>
                    <el-form-item label="所属区域:" prop="district" class="selected">
                        <template>
                            <!-- type==all 全部  text 文本  code 编码 -->
                            <area-select type="text" v-model="publishForm.district" :data="$pcaa" :level="3"></area-select>
                        </template>
                    </el-form-item>
                    <el-form-item label="客户端:" prop="role">
                        <el-radio-group v-model="publishForm.role">
                            <el-radio label="居民端"></el-radio>
                            <el-radio label="医生端"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="分配权限:">
                        <el-checkbox v-model="allElection" @change="allElectionFun">全选</el-checkbox>
                        <el-tree
                        :data="power"
                        show-checkbox
                        default-expand-all
                        getCheckedKeys
                        getHalfCheckedKeys
                        setCheckedKeys
                        node-key="id"
                        ref="tree"
                        highlight-current
                        :props="defaultProps"
                        icon-class=""
                        :expand-on-click-node="false"
                        :indent=22>
                        </el-tree>
                    </el-form-item>
                </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="publishDialogVisible = false" class="closeMessage">取 消</el-button>
                <el-button type="primary" @click="DetermineBtn" class="DetermineMessage">确 定</el-button>
            </span>
        </el-dialog>
        <preview ref="previewComponent" :publishForm="publishForm"></preview>
    </div>
</template>

<script>
import bus from '../../assets/eventBus'
import {powerAndDistrict} from '../../service/index'
export default {
    name:'publish',
    props: ['parameter'],
    data() {
        return {
            allElection: false,
            publishDialogVisible:false,
            isTrue: false,  //是否填写完成，用来判断是否关闭messagBox框
            action: '', //文章提交的地址
            resourceCheckedKey: [],
            signCode: [9999],
            publishForm: {
                uname: '',
                username: '',
                pwd: '',
                district: [],
                role:'居民端'
            },
            power: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            publishRule:{
                uname:[
                    { required: true, message: '请输入用户昵称', trigger: 'blur' }
                ],
                username:[
                    { required: true, message: '请输入登录账户', trigger: 'blur' }
                ],
                pwd:[
                    { required: true, message: '请输入登录密码', trigger: 'blur' }
                ],
                district:[
                    { required: true, message: '请选择所属区域', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        DetermineBtn() {
            let tree = this.$refs.tree;
            this.publishForm.powers = tree.getCheckedKeys().concat(tree.getHalfCheckedKeys()).join(',');
            // this.publishForm.district = this.publishForm.district.join(',')
            let vm = this;
            var data = JSON.parse(JSON.stringify(this.publishForm))   //深拷贝对象
            data.district = data.district.join(',');
            this.$refs['publishForm'].validate((valid) => {
                if (valid) {
                    this.parameter.fun(data).then(res => {
                        if(res.data.code == 200){
                            this.$message.success(res.data.message);
                            this.$parent.FindAll();
                        }
                    })
                    this.publishDialogVisible = false //关闭弹框
                } else {
                    this.$message({
                        message: '内容不能为空',
                        type: 'warning'
                    });
                    return false;
                }
            });
        },
        handleOpen(){
            this.publishForm.district = [];
            let powerData = this.$store.getters.getPower;
            powerData.splice(3,1)  // 隐藏广告
            if(this.$store.state.level > 1){   //判断用户等级，根据等级去隐藏用户管理
                for(var i = 0;i<powerData.length;i++){
                    if(powerData[i].id == 6){
                        powerData.splice(i,1)
                    }
                }
            }
            this.power = powerData;
            if(this.parameter.data){
                this.publishForm.id = this.parameter.data.user.id;
                this.publishForm.uname = this.parameter.data.user.uname;
                this.publishForm.username = this.parameter.data.user.username;
                this.publishForm.pwd = this.parameter.data.user.pwd;
                this.publishForm.role = this.parameter.data.user.role;
                this.publishForm.district.push(this.parameter.data.user.province)
                this.publishForm.district.push(this.parameter.data.user.city)
                this.publishForm.district.push(this.parameter.data.user.county)
                this.publishForm.district.push(this.parameter.data.user.town)
                this.$nextTick(() => {
                    this.$refs.tree.setCheckedKeys(this.parameter.data.powers.split(','));
                });
            }else{
                
            }
        },
        allElectionFun(){   //全选
            if(this.allElection){
                let All = [];
                for(let i in this.power){
                    All.push(this.power[i].id)
                };
                this.$refs.tree.setCheckedKeys(All);
            }else{
                this.$refs.tree.setCheckedKeys([]);
            }
        }
    }
}
</script>
<style>
  #avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  #avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  #avatar-uploader .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px !important;
    text-align: center;
  }
  #avatar-uploader .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
</style>
<style lang='scss'>
    .user_publish{
        .publish_warp{
            .el-input__inner{
                height: px2rem(36) !important;
                width: 80%;
            }
            .el-select{
                width: 80%;
                .el-input__inner{
                    width: 100% !important;
                }
            }
        }
        .rich_text{
            .el-form-item__content{
                line-height: 20px !important;
            }
        }
        .el-message-box__btns{
            button:nth-child(1){
                background: #15BE9D !important;
            }
        }
        .previewBtn{
            background: #547BE8;
            color: #ffffff;
            font-size: px2rem(14);
            width: px2rem(80);
            padding: 0;
            line-height: px2rem(36);
            height: px2rem(36);
        }
        .saveDraftBtn{
            background: #F0F1F5;
            color: #707073;
            font-size: px2rem(14);
            width: px2rem(80);
            padding: 0;
            line-height: px2rem(36);
            height: px2rem(36);
        }
        .selected{
            .el-form-item__content{
                line-height: 17px !important;
                .area-select-wrap{
                    .area-select:nth-child(1){
                        margin-left: 0px;
                    }
                }
            }
        }
        .expanded {
            display: none !important;
        }
        .el-tree .el-tree-node .el-tree-node__children .el-tree-node .el-tree-node__children>div{
            float: left !important;
            .el-tree-node__content{ 
                padding-left: 18px !important;
            }
        }
    }
    
</style>
