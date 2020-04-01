import Vue from 'vue'
import './app.styl'

import { proxySetData, setReadyStart } from '../../../../utils/proxy'

proxySetData({
  console: true,
  ready: true
})

setReadyStart()

const App = new Vue({
  onShow (options) {
  },
  render (h) {
    // this.$slots.default 是将要会渲染的页面
    return h('block', this.$slots.default)
  }
})

export default App
