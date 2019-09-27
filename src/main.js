import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'

Vue.use(VueResource)
    // import store from './store'


Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

new Vue({
    router,
    // store,
    render: h => h(App)
}).$mount("#app");