import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

console.log(2)

const app = new Vue(App)
app.$mount()
