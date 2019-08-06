<template>
    <div class="leftTree">
        <el-menu
        default-active="1"
        class="el-menu-vertical-demo el_menu_warp"
        @select="handleSelect"
        background-color="#1F2D54"
        :default-openeds=openeds>
            <el-submenu v-for="(item,index) in msg" :key="index" :index="item.title">
                <template slot="title">
                    <span>{{item.title}}</span>
                </template>
                <el-menu-item v-for="(itemClient ,index) in item.Client" :key="index" :title="itemClient.chilrenTitle" :index="itemClient.indexUrl">
                    <i class="el-icon-location"></i>
                    {{itemClient.text}}
                </el-menu-item>
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
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
var treeDataList = {
    articleIndex: [
        {
            title:'居民端',
            Client: [
                {chilrenTitle: '发布文章', indexUrl: 'publishArticle:111', iconUrl: '',text: '发布文章'},
                {chilrenTitle: '文章审核', indexUrl: 'examineArticle:111', iconUrl: '',text: '文章审核'},
                {chilrenTitle: '分类管理', indexUrl: 'classificationArticle:111', iconUrl: '',text: '分类管理'}
            ]
        },
        {
            title:'医生端',
            Client: [
                {chilrenTitle: '发布文章', indexUrl: 'publishArticle:222', iconUrl: '',text: '发布文章'},
                {chilrenTitle: '文章审核', indexUrl: 'examineArticle:222', iconUrl: '',text: '文章审核'},
                {chilrenTitle: '分类管理', indexUrl: 'classificationArticle:222', iconUrl: '',text: '分类管理'}
            ]
        }
    ],
    videoIndex: [
        {
            title:'居民端',
            Client: [
                {chilrenTitle: '发布视频', indexUrl: 'publishVideo:111', iconUrl: '',text: '发布视频'},
                {chilrenTitle: '视频审核', indexUrl: 'examineVideo:111', iconUrl: '',text: '视频审核'},
                {chilrenTitle: '分类管理', indexUrl: 'classificationVideo:111', iconUrl: '',text: '分类管理'}
            ]
        },
        {
            title:'医生端',
            Client: [
                {chilrenTitle: '发布视频', indexUrl: 'publishVideo:222', iconUrl: '',text: '发布视频'},
                {chilrenTitle: '视频审核', indexUrl: 'examineVideo:222', iconUrl: '',text: '视频审核'},
                {chilrenTitle: '分类管理', indexUrl: 'classificationVideo:222', iconUrl: '',text: '分类管理'}
            ]
        }
    ],
    noticeIndex: [
        {
            title:'居民端',
            Client: [
                {chilrenTitle: '发布公告', indexUrl: 'publishNotice:111', iconUrl: '',text: '发布公告'},
                {chilrenTitle: '公告审核', indexUrl: 'examineNotice:111', iconUrl: '',text: '公告审核'}
            ]
        },
        {
            title:'医生端',
            Client: [
                {chilrenTitle: '发布公告', indexUrl: 'publishNotice:222', iconUrl: '',text: '发布公告'},
                {chilrenTitle: '公告审核', indexUrl: 'examineNotice:222', iconUrl: '',text: '公告审核'}
            ]
        }
    ],
    advertIndex: [
        {
            title:'居民端',
            Client: [
                {chilrenTitle: '广告图片', indexUrl: 'advertIndex:111', iconUrl: '',text: '广告图片'},
            ]
        },
        {
            title:'医生端',
            Client: [
                {chilrenTitle: '广告图片', indexUrl: 'advertIndex:222', iconUrl: '',text: '广告图片'}
            ]
        }
    ],
    healthIndex: [
        {
            title:'家庭医生',
            Client: [
                {chilrenTitle: '服务包', indexUrl: 'servicePack', iconUrl: '',text: '服务包'},
                {chilrenTitle: '服务协议', indexUrl: 'serviceArg', iconUrl: '',text: '服务协议'},
            ]
        }
    ],
    userIndex: [
        {
            title:'用户管理',
            Client: [
                {chilrenTitle: '用户管理', indexUrl: 'userIndex', iconUrl: '',text: '用户管理'},
            ]
        }
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
        bus.$on('user',(msg) => {
            // this.msg = msg
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
