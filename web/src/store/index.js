import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import example from './modules/example'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    example
  },
  getters
})

export default store
