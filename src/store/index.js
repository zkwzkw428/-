import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab.js'
// 使用Vuex
Vue.use(Vuex)
// 创建vuex实例
export default new Vuex.Store({
    modules:{
        tab,
    }
})