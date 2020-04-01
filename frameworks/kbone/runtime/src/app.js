import * as proxy from '../../../../utils/proxy'

proxy.proxySetData({
  console: true
})

wx.proxy = proxy

proxy.setReadyStart()

