/*
 * @Author: Wind Rises
 * @Date: 2020-05-23 20:02:25
 * @Last Modified by: Wind Rises
 * @Last Modified time: 2020-05-23 20:14:57
 */
import Vue from 'vue'
import EventProxy from 'vue-event-proxy'
import RouterPatch from './plugins/router-patch'
import store from './store/index'
import http from './utils/http'
import { scan } from './utils/uni'
import App from './App.vue'
import './styles/iconfont.css'
import './styles/numfont.css'
import uView from '@/uview-ui'

Vue.config.productionTip = false

Vue.prototype.$http = http
Vue.prototype.$store = store
Vue.prototype.$scan = scan

Vue.use(uView)
Vue.use(RouterPatch)
Vue.use(EventProxy)

new App().$mount()
