import Vue from 'vue'
import App from './App.vue'
import router from './router'
import fastClick from 'fastclick'
import './assets/styles/border.css'
import './assets/styles/reset.css'

Vue.config.productionTip = false
fastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
