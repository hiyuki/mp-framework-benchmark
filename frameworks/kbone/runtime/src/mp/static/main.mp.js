import Vue from 'vue'
import Router from 'vue-router'
import App from '../../App.vue'
import Static from '../../pages/static.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/(static)?',
    name: 'Static',
    component: Static,
  }],
})

export default function createApp() {
  const container = document.createElement('div')
  container.id = 'app'
  document.body.appendChild(container)

  Vue.config.productionTip = false

  return new Vue({
    el: '#app',
    router,
    render: h => h(App)
  })
}
