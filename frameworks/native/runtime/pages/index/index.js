const proxy = require('../../utils/proxy')
const dataHelper = require('../../utils/data')


Component({
  data: {
    listData: [],
    listData2: [],
    show2: false
  },
  methods: {
    onReady: function onReady () {
      proxy.getReadyTimeWithModal()
    },
    reLaunch: function reLaunch () {
      proxy.setReadyStart()
      wx.reLaunch({
        url: '/pages/index/index'
      })
    },
    reLaunch2: function reLaunch2 () {
      proxy.setReadyStart()
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
    add2Lot2: function add2Lot2 () {
      proxy.getTimeWithModal(this)
      this.setData({
        listData2: this.data.listData2.concat(dataHelper.buildData(5000, true))
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
      var listData = this.data.listData
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
      var listData = this.data.listData
      if (listData[0]) {
        listData[0].amount++
        this.setData({
          listData
        })
      }
    },
    updateAll: function updateAll () {
      proxy.getTimeWithModal(this)
      var listData = this.data.listData
      listData.forEach(function (item) {
        item.amount++
      })
      this.setData({
        listData
      })
    }
  }
})
