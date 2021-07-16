import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import createPersistentState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins:[
    createPersistentState({
      storage:window.sessionStorage,
      key:'store',
    })
  ]
})
