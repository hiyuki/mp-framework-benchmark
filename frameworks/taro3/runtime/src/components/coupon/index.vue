<template>
  <view class="coupon" @tap="toggleSelect" :class="{selected:selected, invalid:!info.valid}">
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
  import { getTimeWithModal,getCurrentPageContext } from '../../../../../../utils/proxy'
  import './index.styl'

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
          getTimeWithModal(getCurrentPageContext())
          this.selected = !this.selected
        }
      }
    }
  }
</script>


