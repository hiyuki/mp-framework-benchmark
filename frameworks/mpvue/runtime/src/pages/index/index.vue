<template>
  <view>
    <view class="controls">
      <button @click="add">新增可用券(100)</button>
      <button @click="deleteAll">删除可用券(all)</button>
      <button @click="addLot">新增可用券(1000)</button>
      <button @click="update">更新可用券(1)</button>
      <button @click="updateAll">更新可用券(all)</button>
      <button @click="deleteOne">删除可用券(1)</button>
      <button @click="add2Lot">新增不可用券(1000)</button>
      <button @click="add2Lot2">新增不可用券(5000)</button>
      <button @click="toggleList">切换到{{show2?'可用券':'不可用券'}}</button>
      <button @click="reLaunch">刷新页面</button>
      <button @click="reLaunch2">进入静态测试</button>
    </view>
    <view v-if="!show2" class="couponList">
      <view class="title">可用券列表({{listData.length}})</view>
      <coupon v-for="item in listData" :key="id" :info="item"></coupon>
    </view>
    <view v-else class="couponList">
      <view class="title">不可用券列表({{listData2.length}})</view>
      <coupon v-for="item in listData2" :key="id" :info="item"></coupon>
    </view>
  </view>
</template>

<script>
  import coupon from '../../components/coupon'
  import { buildData } from '../../../../../../utils/data'
  import { getTimeWithModal, getCurrentPageContext,getReadyTimeWithModal,setReadyStart } from '../../../../../../utils/proxy'


  export default {
    components: {
      coupon
    },
    data () {
      return {
        listData: [],
        listData2: [],
        show2: false
      }
    },
    onReady () {
      getReadyTimeWithModal()
    },
    methods: {
      reLaunch () {
        setReadyStart()
        wx.reLaunch({
          url: '/pages/index/main'
        })
      },
      reLaunch2 () {
        setReadyStart()
        wx.reLaunch({
          url: '/pages/static/main'
        })
      },
      toggleList () {
        getTimeWithModal(getCurrentPageContext())
        this.show2 = !this.show2
      },
      add2Lot () {
        getTimeWithModal(getCurrentPageContext())
        this.listData2 = this.listData2.concat(buildData(1000, true))
      },
      add2Lot2 () {
        getTimeWithModal(getCurrentPageContext())
        this.listData2 = this.listData2.concat(buildData(5000, true))
      },
      add () {
        getTimeWithModal(getCurrentPageContext())
        this.listData = this.listData.concat(buildData(100))
      },
      addLot () {
        getTimeWithModal(getCurrentPageContext())
        this.listData = this.listData.concat(buildData(1000))
      },
      deleteOne () {
        getTimeWithModal(getCurrentPageContext())
        this.listData.shift()
      },
      deleteAll () {
        getTimeWithModal(getCurrentPageContext())
        this.listData = []
      },
      update () {
        getTimeWithModal(getCurrentPageContext())
        const listData = this.listData
        if (listData[0]) {
          listData[0].amount++
        }
      },
      updateAll () {
        getTimeWithModal(getCurrentPageContext())
        this.listData.forEach((item) => {
          item.amount++
        })
      }
    }
  }
</script>


<style lang="stylus">
  .couponList
    padding 0 12px

    .title
      font-size 16px
      margin-top 12px

  .controls
    padding 4px 12px 0 12px

    button
      margin-top 8px
      font-size 16px
</style>


