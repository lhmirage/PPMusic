import Vue from "vue"
import Vuex from "vuex"
import state from "./state"

import * as getters from "./getters"
import * as mutations from "./mutations"
import createLogger from "vuex/dist/logger"

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  plugins: [createLogger()]
})

export default store