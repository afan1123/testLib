import Vue from 'vue'
import getConfig from '@/utils/getConfig'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store'
import './icons' // icon
import './errorLog'// error log
import directive from '@/directive' // 引入自定义指令文件
import '@/prototype'
import * as filters from './filters' // global filters
import i18n from './lang'
import './font/index.css'
import swiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.min.css'
Vue.use(swiper)

/* 滚动条插件 */
import vuescroll from 'vuescroll'
import 'vuescroll/dist/vuescroll.css'
Vue.use(vuescroll)
// 复制插件
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// 全局注册自定义指令
Object.keys(directive).forEach(key => {
  Vue.directive(key, directive[key])
})

// 全局注册自定义过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

// build 动态更改配置
async function init() {
  await getConfig()
  new Vue({
    el: '#app',
    router,
    i18n,
    store,
    template: '<App/>',
    components: { App }
  })
}
init()

