import Vue from 'vue'
import App from './App.vue'
import router from './router'
require(`@/plugins/element-ui`)
require(`@/plugins/clipboard`)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')