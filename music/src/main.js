import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import fastclick from 'fastclick'
import '@/common/stylus/index.styl'
fastclick.attach(document.body)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
