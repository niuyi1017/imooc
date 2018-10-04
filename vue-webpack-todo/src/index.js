import Vue from 'vue';
import App from './app.vue'

import './assets/images/69b7d63agy1fvipp4gnztj21hc0p51bx.jpg'
import './assets/styles/test.css'
import './assets/styles/test.stylus.styl'
const root = document.createElement('div')
document.body.appendChild(root)
new Vue({
    render: h =>{
        return h(App)
    }

}).$mount(root)