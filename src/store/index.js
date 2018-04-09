/**
 * Created by OXOYO on 2017/4/5.
 * store.js
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import state from './state'
import * as actions from './actions'
import mutations from './mutations'

export default new Vuex.Store({
    state,
    actions,
    mutations
})