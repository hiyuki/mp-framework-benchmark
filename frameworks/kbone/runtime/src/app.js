import * as proxy from '../../../../utils/proxy'

proxy.proxySetData({
  console: true,
  context: global
})

wx.proxy = proxy

