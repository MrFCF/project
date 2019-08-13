import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginUser: sessionStorage.getItem('LoginUser') ? JSON.parse(sessionStorage.getItem('LoginUser')) : null,
    parameterURL: '111', //公共参数,判断是医生端还是居民端 
    powers: '',
    level: sessionStorage.getItem('level') ? sessionStorage.getItem('level') : 2,
  },
  mutations: {
    initUser(state, payload){
      state.loginUser = payload;
    },
    initparameterURL(state, URL){
      state.parameterURL = URL;
    },
    initPower(state, value){
      state.powers = value
    }
  },
  actions: {

  },
  getters:{

    getPower(state) {
      return state.powers
    }

  }
})
