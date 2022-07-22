import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedTokens: [],
    tokenList: [],
    actions: {
      tokenSelected: false
    },
    finalResult: null
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
