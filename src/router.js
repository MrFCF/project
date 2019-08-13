import Vue from 'vue'
import Router from 'vue-router'
// import { message } from element-ui
import home from './views/Home.vue'
import main_warp from './views/Main_warp.vue'
// 登录
import login from './views/Login.vue'
// 404
import noFound from './views/noFound/noFound.vue'
import noPermission from './views/noFound/noPermission.vue'
import noData from './views/noFound/noData.vue'
//文章
import articleIndex from './views/Article/index.vue'  
import publishArticle from './views/Article/publish.vue'
import examineArticle from './views/Article/examine.vue'
import classificationArticle from './views/Article/classification.vue'

// 视频
import videoIndex from './views/Video/index.vue'

// 公告
import noticeIndex from './views/Notice/index.vue'

// 广告
import advertIndex from './views/Advert/index.vue'

// 公共卫生
import healthIndex from './views/Health/index.vue'

// 用户管理
import userIndex from './views/User/index.vue'


Vue.use(Router)



var router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      component: main_warp,
      redirect:'/home',
      children:[
        {
          path: '/home',
          component: home
        },
        {
          path: '/articleIndex',
          component: articleIndex,
          redirect:'/articleIndex/publishArticle',
          children:[
            {
              path: 'publishArticle',
              component:publishArticle
            },
            {
              path: 'examineArticle',
              component:examineArticle
            },
            {
              path: 'classificationArticle',
              component:classificationArticle
            }
          ]
        },
        {
          path: '/videoIndex',
          component: videoIndex,
          redirect:'/videoIndex/publishVideo',
          children: [
            {
              path: 'publishVideo',
              component : () => import('./views/Video/publish.vue')
            },
            {
              path: 'examineVideo',
              component:() => import('./views/Video/examine.vue')
            },
            {
              path: 'classificationVideo',
              component:() => import('./views/Video/classification.vue')
            }
          ]
        },
        {
          path: '/noticeIndex',
          component: noticeIndex,
          redirect:'/noticeIndex/publishNotice',
          children: [
            {
              path: 'publishNotice',
              component : () => import('./views/Notice/publish.vue')
            },
            {
              path: 'examineNotice',
              component:() => import('./views/Notice/examine.vue')
            }
          ]
        },
        {
          path: '/advertIndex',
          component: advertIndex,
        },
        {
          path: '/healthIndex',
          component: noticeIndex,
          redirect:'/healthIndex/servicePack',
          children: [
            {
              path: 'servicePack',
              component : () => import('./views/Health/servicePack.vue')
            },
            {
              path: 'serviceArg',
              component:() => import('./views/Health/serviceArg.vue')
            }
          ]
        },
        {
          path: '/userIndex',
          component: userIndex,
        },
        {path: '/noPermission',name: 'noPermission',component: noPermission},  //无权限
        {path: '*',name: 'noFound',component: noFound}, //404页面
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  if(to.path != '/'){
    let isTrue = sessionStorage.getItem('LoginUser') ? true : false;
    if(isTrue){
      next();
    }else{
      next('/');
      // this.$message.info('检测到您未登录,请重新登录!');
    }
  }else{
    next();
  }
})

export default router