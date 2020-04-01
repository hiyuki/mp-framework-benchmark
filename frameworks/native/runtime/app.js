const proxy = require('./utils/proxy')

proxy.proxySetData({
  console: true
})

proxy.setReadyStart()

App({
  onLaunch () {
  }
})
