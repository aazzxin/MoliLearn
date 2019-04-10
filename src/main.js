import Vue from 'vue'
import App from './App'
import mpvueToastRegistry from 'mptoast/src/registry'
import request from './utils/request.js'
import 'mpvue-weui/src/style/weui.css'

Vue.config.productionTip = false
Vue.prototype.$post = request.post
App.mpType = 'app'
mpvueToastRegistry(Vue)

const app = new Vue(App)
app.$mount()
