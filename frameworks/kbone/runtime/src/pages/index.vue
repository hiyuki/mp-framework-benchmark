<template>
  <div>
    <div class="controls">
      <wx-button @click="add">新增可用券(100)</wx-button>
      <wx-button @click="addLot">新增可用券(1000)</wx-button>
      <wx-button @click="deleteOne">删除可用券(1)</wx-button>
      <wx-button @click="deleteAll">删除可用券(all)</wx-button>
      <wx-button @click="update">更新可用券(1)</wx-button>
      <wx-button @click="updateAll">更新可用券(all)</wx-button>
      <wx-button @click="add2Lot">新增不可用券(1000)</wx-button>
      <wx-button @click="toggleList">切换到{{show2?'可用券':'不可用券'}}</wx-button>
      <wx-button @click="reLaunch">刷新页面</wx-button>
      <wx-button @click="reLaunch2">进入静态测试</wx-button>
    </div>
    <div v-if="!show2" class="couponList">
      <div class="title">可用券列表({{listData.length}})</div>
      <coupon v-for="item in listData" :key="item.id" :info="item"></coupon>
    </div>
    <div v-else class="couponList">
      <div class="title">不可用券列表({{listData2.length}})</div>
      <coupon v-for="item in listData2" :key="item.id" :info="item"></coupon>
    </div>
  </div>
</template>

<script>
  import coupon from '../components/coupon'
  import { buildData } from '../../../../../utils/data'

  const { getTimeWithModal, getCurrentPageContext } = wx.proxy

  wx.startTime = +new Date()
  const data = buildData(100)

  export default {
    components: {
      coupon
    },
    data () {
      return {
        listData: data,
        listData2: [],
        show2: false
      }
    },
    created () {
      window.addEventListener('wxready', () => {
        wx.showModal({
          content: `页面ready耗时: ${+new Date() - wx.startTime}`
        })
      })
    },
    methods: {
      reLaunch () {
        wx.startTime = +new Date()
        wx.reLaunch({
          url: '/pages/index/index'
        })
      },
      reLaunch2 () {
        wx.startTime = +new Date()
        wx.reLaunch({
          url: '/pages/static/index'
        })
      },
      toggleList () {
        getTimeWithModal(this.$el._wxComponent)
        this.show2 = !this.show2
      },
      add2Lot () {
        getTimeWithModal(this.$el._wxComponent)
        this.listData2 = this.listData2.concat(buildData(1000, true))
      },
      add () {
        getTimeWithModal(this.$el._wxComponent)
        this.listData = this.listData.concat(buildData(100))
      },
      addLot () {
        getTimeWithModal(this.$el._wxComponent)
        this.listData = this.listData.concat(buildData(1000))
      },
      deleteOne () {
        getTimeWithModal(this.$el._wxComponent)
        const listData = this.listData.slice()
        listData.shift()
        this.listData = listData
      },
      deleteAll () {
        getTimeWithModal(this.$el._wxComponent)
        this.listData = []
      },
      update () {
        getTimeWithModal(this.$el._wxComponent)
        const listData = this.listData.slice()
        if (listData[0]) {
          listData[0].amount += 1
          this.listData = listData
        }
      },
      updateAll () {
        getTimeWithModal(this.$el._wxComponent)
        const listData = this.listData.slice()
        listData.forEach((item) => {
          item.amount += 1
        })
        this.listData = listData
      }
    }
  }
</script>

<style>
  .couponList {
    padding: 0 12px;
  }

  .couponList .title {
    font-size: 16px;
    margin-top: 12px;
  }

  .controls {
    padding: 4px 12px 0 12px;
  }

  .controls wx-button {
    margin-top: 8px;
    font-size: 16px;
  }
</style>






