<template>
  <view class="coupon" @click="toggleSelect" :class="{selected:selected, invalid:!info.valid}">
    <view class="desc">
      <view class="main">
        {{info.type}}券
      </view>
      <view class="sub">
        有效期至 {{info.date}}
      </view>
      <view class="amount">
        <view class="unit">¥</view>
        <view class="num">{{info.amount}}</view>
      </view>
    </view>
    <view class="bottom">
      <view class="limit">
        <view v-if="info.valid">
          {{info.city}}, {{info.limit}}时段可用
        </view>
        <view v-else>
          目前不可用
        </view>
      </view>
      <view class="detail">查看详情</view>
    </view>
  </view>
</template>

<script>
  import { getTimeWithModal } from '../../../../../utils/proxy'

  export default {
    data () {
      return {
        selected: false
      }
    },
    props: {
      info: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    methods: {
      toggleSelect () {
        if (this.info.valid) {
          getTimeWithModal(this.$scope)
          this.selected = !this.selected
        }
      }
    }

  }
</script>

<style lang="stylus">
  $color-dark-orange = #f08250
  $color-light-orange = #fc9153
  $color-grey-orange = #ffc4a6
  $color-orange = #fc9153

  .coupon
    width 100%
    height 130px
    box-sizing border-box
    position relative
    padding 12px
    border-bottom #cba solid 5px
    border-radius 0 0 5px 5px
    font-size 12px
    margin 10px 0
    box-shadow 0 0 2px rgba(0, 0, 0, 0.2)
    color #654

    &.selected
      border-color rgb(252, 145, 83)
      background-image radial-gradient(circle at bottom right, rgba(252, 145, 83, .1) 0, #fff 80%)

    &.invalid
      color #aaa
      border-color #ccc

      .desc
        .amount
          color #999


    .desc
      .main
        font-size 16px

      .amount
        position absolute
        top 2px
        right 12px
        color #432

        .unit
          display inline-block
          font-size 14px

        .num
          display inline-block
          font-size 42px

    .bottom
      position absolute
      bottom 0
      left 0
      width 100%
      padding 6px 12px
      box-sizing border-box
      border-top 1px dashed rgba(0, 0, 0, .1)


      .limit
        float left

      .detail
        float right
</style>
