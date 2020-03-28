const proxy = require('../../utils/proxy')
const dataHelper = require('../../utils/data')


wx.startTime = +new Date()
const data = dataHelper.buildData(100)

Component({
  data: {
    listData: data,
    listData2: [],
    show2: false
  },
  methods: {
    onReady: function onReady () {
      wx.showModal({
        content: '页面ready耗时: ' + (+new Date() - wx.startTime)
      })
    },
    reLaunch: function reLaunch () {
      wx.startTime = +new Date()
      wx.reLaunch({
        url: '/pages/index/index'
      })
    },
    reLaunch2: function reLaunch2 () {
      wx.startTime = +new Date()
      wx.reLaunch({
        url: '/pages/static/static'
      })
    },
    toggleList: function toggleList () {
      proxy.getTimeWithModal(this)
      this.setData({
        show2: !this.data.show2
      })
    },
    add2Lot: function add2Lot () {
      proxy.getTimeWithModal(this)
      this.setData({
        listData2: this.data.listData2.concat(dataHelper.buildData(1000, true))
      })
    },
    add: function add () {
      proxy.getTimeWithModal(this)
      this.setData({
        listData: this.data.listData.concat(dataHelper.buildData(100))
      })
    },
    addLot: function addLot () {
      proxy.getTimeWithModal(this)
      this.setData({
        listData: this.data.listData.concat(dataHelper.buildData(1000))
      })
    },
    delete: function _delete () {
      proxy.getTimeWithModal(this)
      var listData = this.data.listData.slice()
      listData.shift()
      this.setData({
        listData
      })
    },
    deleteAll: function deleteAll () {
      proxy.getTimeWithModal(this)
      this.setData({
        listData: []
      })
    },
    update: function update () {
      proxy.getTimeWithModal(this)
      var listData = this.data.listData.slice()
      if (listData[0]) {
        listData[0].amount += 1
        this.setData({
          listData
        })
      }
    },
    updateAll: function updateAll () {
      proxy.getTimeWithModal(this)
      var listData = this.data.listData.slice()
      listData.forEach(function (item) {
        item.amount += 1
      })
      this.setData({
        listData
      })
    }
  }
})
