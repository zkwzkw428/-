import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
// 按需引入
// import {Row,Button,} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index.js'
import store from './store/index.js'
// 引入mock
import './api/mock'
Vue.use(ElementUI)
// Vue.component(Row.name,Row)
// Vue.component(Button.name, Button)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
