import Vue from 'vue'
import App from './App'
import mpvueToastRegistry from 'mptoast/src/registry'
import request from './utils/request.js'
import global from './api/global.js'
import 'mpvue-weui/src/style/weui.css'

Vue.config.productionTip = false
App.mpType = 'app'
mpvueToastRegistry(Vue)

const app = new Vue(App)
app.$mount()
Vue.prototype.$request = request.request
Vue.prototype.globalData = global
