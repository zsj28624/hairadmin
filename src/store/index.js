import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    orderlist:null,
    evaluatelist:null,
    stylist:null,
  },
  mutations: {
    setData(state,data){
      state[data.key] = data.value
    }
   
  },
  actions: {
  },
  modules: {
  }
})
