<template>
    <div class="user_publish">
        <el-dialog
            :title="parameter.title"
            :visible.sync="publishDialogVisible"
            :close-on-click-modal="false"
            center
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
                    <el-form-item label="客户端:" prop="client">
                        <el-radio-group v-model="publishForm.client">
                            <el-radio label="居民端"></el-radio>
                            <el-radio label="医生端"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="分配权限:">
                        <el-checkbox v-model="allElection">全选</el-checkbox>
                        <el-tree
                        :data="publishForm.power"
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
            aaa:[1, 11, 111, 112, 113, 12, 121, 122, 123, 21, 211, 212, 213, 222, 223, 9999, 2, 22],
            publishForm: {
                uname: '',
                username: '',
                pwd: '',
                district: [],
                client:'居民端',
                power: [{
                    id: 1,
                    label: '文章',
                    children: [{id: 111,label: '发布文章'}, {id: 112,label: '审核文章'}, {id: 113,label: '文章分类'}]
                    }, {
                    id: 2,
                    label: '视频',
                    children: [{id: 211,label: '发布文章'}, {id: 212,label: '审核文章'}, {id: 213,label: '文章分类'}]
                    }, {
                    id: 3,
                    label: '公告',
                    children: [{id: 311,label: '发布公告'}, {id: 10,label: '审核公告'}]
                    },
                    {
                    id: 4,
                    label: '广告',
                    children: [{id: 411,label: '广告图片'}]
                    },
                    {
                    id: 5,
                    label: '公共卫生',
                    children: [
                        {id: 511,label: '服务包'}, {id: 512,label: '服务协议'}
                    ]
                   }
                ]
            },
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
            // console.log(this.$refs.tree.getCheckedKeys())
            // console.log(this.$refs.tree.getHalfCheckedKeys())
            console.log(this.publishForm)
            let tree = this.$refs.tree;
            tree.getCheckedKeys().concat(this.signCode,tree.getHalfCheckedKeys())
            console.log(tree.getCheckedKeys().concat(this.signCode,tree.getHalfCheckedKeys()))
            let vm = this;
            this.$refs['publishForm'].validate((valid) => {
                if (valid) {
                    this.parameter.fun(this.publishForm).then(res => {
                        console.log(res)
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
        CheckedKeys(leafOnly){
            console.log(leafOnly)
        }
    },
    watch:{
        allElection(){   //全选
            if(this.allElection){
                let All = [];
                for(let i in this.publishForm.power){
                    All.push(this.publishForm.power[i].id)
                };
                this.$refs.tree.setCheckedKeys(All);
            }else{
                this.$refs.tree.setCheckedKeys([]);
            }
        },
        parameter(){
            if(this.parameter.data){
                this.publishForm = this.parameter.data
            }
        }
    },
    beforeMount(){
        let getIdList = this.aaa;
        let filterId = getIdList.indexOf(this.signCode[0]);  // 获取 标识数组元素 当前索引
        getIdList.splice(filterId, getIdList.length - filterId); // 利用 splice 方法 从当前索引处开始切割，切割个数为  getIdList.length - filterId
        console.log(getIdList)
        this.$refs.tree.setCheckedKeys(getIdList)// 根据 getIdList 数组的值进行选中
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
