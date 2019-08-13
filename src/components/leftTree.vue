<template>
    <div class="leftTree">
        <el-menu
        default-active="1"
        class="el-menu-vertical-demo el_menu_warp"
        @select="handleSelect"
        background-color="#1F2D54"
        :default-openeds=openeds>
            <el-menu-item  v-for="(item,index) in msg" :key="index" :title="item.chilrenTitle" :index="item.indexUrl">
                <i class="el-icon-location"></i>
                <span slot="title">{{item.text}}</span>
            </el-menu-item>
            <!-- <el-submenu >
                <template slot="title">
                    <span >{{item.chilrenTitle}}</span>
                </template> -->
                <!-- <el-menu-item v-for="(itemClient ,index) in item.Client" :key="index" :title="itemClient.chilrenTitle" :index="itemClient.indexUrl">
                    <i class="el-icon-location"></i>
                    
                </el-menu-item> -->
                <!-- <el-menu-item title="文章审核" index="examineArticle:111">
                    <i class="el-icon-location"></i>
                    文章审核
                </el-menu-item>
                <el-menu-item title="文章管理" index="classificationArticle:111">
                    <i class="el-icon-location"></i>
                    文章管理
                </el-menu-item>
            </el-submenu>
            <el-submenu index="医生端">
                <template slot="title">
                    <span>医生端</span>
                </template>
                <el-menu-item title="发布文章" index="publishArticle:222">
                    <i class="el-icon-location"></i>
                    发布文章
                </el-menu-item>
                <el-menu-item title="文章审核" index="examineArticle:222">
                    <i class="el-icon-location"></i>
                    文章审核
                </el-menu-item>
                <el-menu-item title="文章管理" index="classificationArticle:222">
                    <i class="el-icon-location"></i>
                    文章管理
                </el-menu-item> -->
            <!-- </el-submenu> -->
        </el-menu>
    </div>
</template>

<script>
var treeDataList = {
    articleIndex: [
        {id:7,chilrenTitle: '发布文章', indexUrl: 'publishArticle', iconUrl: '',text: '发布文章'},
        {id:8,chilrenTitle: '文章审核', indexUrl: 'examineArticle', iconUrl: '',text: '文章审核'},
        {id:9,chilrenTitle: '分类管理', indexUrl: 'classificationArticle', iconUrl: '',text: '分类管理'}
    ],
    videoIndex: [
        {id:10,chilrenTitle: '发布视频', indexUrl: 'publishVideo', iconUrl: '',text: '发布视频'},
        {id:11,chilrenTitle: '视频审核', indexUrl: 'examineVideo', iconUrl: '',text: '视频审核'},
        {id:12,chilrenTitle: '分类管理', indexUrl: 'classificationVideo', iconUrl: '',text: '分类管理'}
    ],
    noticeIndex: [
        {id:13,chilrenTitle: '发布公告', indexUrl: 'publishNotice', iconUrl: '',text: '发布公告'},
        {id:14,chilrenTitle: '公告审核', indexUrl: 'examineNotice', iconUrl: '',text: '公告审核'}
    ],
    advertIndex: [
        {id:16  ,chilrenTitle: '广告图片', indexUrl: 'advertIndex', iconUrl: '',text: '广告图片'},
    ],
    healthIndex: [
        {id:17,chilrenTitle: '服务包', indexUrl: 'servicePack', iconUrl: '',text: '服务包'},
        {id:18,chilrenTitle: '服务协议', indexUrl: 'serviceArg', iconUrl: '',text: '服务协议'},
    ],
    userIndex: [
        {id:19,chilrenTitle: '用户管理', indexUrl: 'userIndex', iconUrl: '',text: '用户管理'},
    ]
}

import bus from '../assets/eventBus'
export default {
    name:'leftTree',
    data() {
        return {
            msg: '',
            openeds:[],
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            let jumpUrl = key.split(':')[0];
            this.$router.push({
                path: jumpUrl,
                query:{
                    jumParameter:key.split(':')[1]   //传递的参数,判断医生端或者居民端
                }
            })
        }
    },
    beforeMount(){
        bus.$on('power',(power) => {
            // this.msg = msg
            var isTrue;
            for(var i = 0;i< power.length;i++){
                    switch(power[i].id)
                        {
                            case 1:
                                for(var j = 0;j<treeDataList.articleIndex.length;j++){
                                    isTrue = false;
                                    for(var z = 0;z<power[i].children.length;z++){
                                        if(treeDataList.articleIndex[j].id == power[i].children[z].id){
                                            isTrue = true;
                                            break;
                                        }
                                    }
                                    
                                    if(!isTrue){
                                        treeDataList.articleIndex.splice(j,1)
                                    }
                                }
                                break;
                            case 2:
                                for(var j = 0;j<treeDataList.videoIndex.length;j++){
                                    for(var z = 0;z<power[i].children.length;z++){
                                        if(treeDataList.videoIndex[j].id == power[i].children[z].id){
                                            isTrue = true;
                                            break;
                                        }
                                    }
                                    if(!isTrue){
                                        treeDataList.articleIndex.splice(j,1)
                                    }
                                }
                                break;
                            case 3:
                                for(var j = 0;j<treeDataList.noticeIndex.length;j++){
                                    for(var z = 0;z<power[i].children.length;z++){
                                        if(treeDataList.noticeIndex[j].id == power[i].children[z].id){
                                            isTrue = true;
                                            break;
                                        }
                                    }
                                    if(!isTrue){
                                        treeDataList.articleIndex.splice(j,1)
                                    }
                                }
                                break;
                            case 4:
                                for(var j = 0;j<treeDataList.advertIndex.length;j++){
                                    for(var z = 0;z<power[i].children.length;z++){
                                        if(treeDataList.advertIndex[j].id == power[i].children[z].id){
                                            isTrue = true;
                                            break;
                                        }
                                    }
                                    if(!isTrue){
                                        treeDataList.articleIndex.splice(j,1)                                        
                                    }
                                }
                                break;
                            case 5:
                                for(var j = 0;j<treeDataList.healthIndex.length;j++){
                                    for(var z = 0;z<power[i].children.length;z++){
                                        if(treeDataList.healthIndex[j].id == power[i].children[z].id){
                                            isTrue = true;
                                            break;
                                        }
                                    }
                                    if(!isTrue){
                                        treeDataList.articleIndex.splice(j,1)    
                                    }
                                }
                                break;
                            case 6:
                                for(var j = 0;j<treeDataList.userIndex.length;j++){
                                    for(var z = 0;z<power[i].children.length;z++){
                                        if(treeDataList.userIndex[j].id == power[i].children[z].id){
                                            isTrue = true;
                                            break;
                                        }
                                    }
                                    if(!isTrue){
                                        treeDataList.articleIndex.splice(j,1)    
                                    }
                                }
                                break;
                        }
                }
        })
        let routeUrl = this.$route.path.split('/')[1];  //获取路由信息;
        this.msg = treeDataList[routeUrl];  //改变当前树的结构
        for(let i in this.msg){
            this.openeds.push(this.msg[i].title)
        }
    }
}
</script>

<style lang='scss' scoped>
    
</style>

<style lang='scss'>
    .leftTree{
        float: left;
        width: px2rem(220);
        height: 100%;
        .el_menu_warp{
            padding: px2rem(48) 0;
            height: 100%;
            .el-submenu{
                .el-submenu__title{
                    color: #85A5FF;
                }
                .el-menu-item-group__title{
                    color: #DBE3FF;
                }
            }   
            .is-active{
                color: #85A5FF;
            }
            .el-menu-item{
                color: #DBE3FF;
                height: px2rem(46);
                line-height: px2rem(46);
            }
        }
    }
</style>
