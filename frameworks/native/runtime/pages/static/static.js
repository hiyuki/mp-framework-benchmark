const proxy = require('../../utils/proxy')

Component({
  methods: {
    onReady: function onReady () {
      proxy.getReadyTimeWithModal()
    },
    reLaunch: function reLaunch () {
      proxy.setReadyStart()
      wx.reLaunch({
        url: '/pages/static/static'
      })
    },
    reLaunch2: function reLaunch2 () {
      proxy.setReadyStart()
      wx.reLaunch({
        url: '/pages/index/index'
      })
    }
  }
})
