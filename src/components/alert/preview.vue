<template>
    <div class="preview">
        <el-dialog
            :visible.sync="centerDialogVisible"
            width="30%"
            :lock-scroll="true"
            custom-class="phonePreview"
            center>
            <div class="preview_warp">
                <div class="content">
                    <h3 class="preview_title">{{publishForm.title}}</h3>
                    <div v-html="publishForm.content">
                        
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:'preview',
    props:["publishForm"],
    data() {
        return {
            centerDialogVisible: false
        }
    },
    mounted(){
        console.log(this.publishForm);
    },
    methods:{
        closeDialog(done){
            console.log(done)
        }
    }
}
</script>
<style lang='scss'>
    .preview{
        .el-dialog__wrapper{
            background: rgba(0,0,0,0.8);
            top: auto !important;
            .phonePreview{
                width: 486px !important;
                -webkit-box-shadow: none;
                box-shadow:none; 
                background: none;
                .preview_warp{
                    width: 100%;
                    height: 869px;
                    background: url('../../assets/images/preview.png') no-repeat 50% 50%; 
                    background-size: cover;
                    background-position: center;
                    padding: 144px 40px 196px 40px;
                    box-sizing: border-box;
                    .content{
                        overflow-y: auto;
                        height: 100%;
                        padding: 18px 15px;
                        font-size: px2rem(20);
                        color: #333333;
                        .preview_title{
                            padding-bottom: px2rem(30);
                            font-size: px2rem(30);
                        }
                        img{
                            max-width: 100%;
                        }
                        p{
                            margin-bottom: 20px;
                        }
                    }
                    .content::-webkit-scrollbar { width: 0 !important }
                    .content { -ms-overflow-style: none; }
                    .content { overflow: -moz-scrollbars-none; }
               }
               .el-dialog__header{
                   padding: 0px;
                   .el-icon-close::before{
                       right: 0px;
                       top: 80px;
                   }
               }
               .el-dialog__body{
                   padding: 0px;
                   background: none;
               }
            }
        }
    }
</style>