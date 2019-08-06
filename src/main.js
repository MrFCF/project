import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueUeditorWrap from 'vue-ueditor-wrap'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import pluginCompontent from './lib/globel_components';
import moment from 'moment';
import { pcaa } from 'area-data-vue';
import 'area-linkage-vue/dist/index.css';
import AreaLinkageVue from 'area-linkage-vue';
Vue.prototype.$pcaa = pcaa;
Vue.use(AreaLinkageVue)

Vue.config.productionTip = false
Vue.component('vue-ueditor-wrap', VueUeditorWrap)
Vue.use(ElementUI);
Vue.use(pluginCompontent);

Vue.filter('moment', function (value, formatString) { 
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss'; 
  return moment(value).format('YYYY-MM-DD'); 
}); 

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
