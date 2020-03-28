Component({
  methods: {
    onReady: function onReady () {
      wx.showModal({
        content: '页面ready耗时: ' + (+new Date() - wx.startTime)
      })
    },
    reLaunch: function reLaunch () {
      wx.startTime = +new Date()
      wx.reLaunch({
        url: '/pages/static/static'
      })
    },
    reLaunch2: function reLaunch2 () {
      wx.startTime = +new Date()
      wx.reLaunch({
        url: '/pages/index/index'
      })
    }
  }
})
