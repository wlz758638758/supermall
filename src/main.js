import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import store from './store'
import toast from '@/components/common/toast'
Vue.use(VueResource)
    // import store from './store'


Vue.config.productionTip = false
    // 添加事件总线对象
Vue.prototype.$bus = new Vue()
    // 安装toast插件
Vue.use(toast)


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");