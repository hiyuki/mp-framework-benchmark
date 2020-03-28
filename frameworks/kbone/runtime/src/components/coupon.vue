<template>
  <div class="coupon" @click="toggleSelect" :class="{selected:selected, invalid:!info.valid}">
    <div class="desc">
      <div class="main">
        {{info.type}}券
      </div>
      <div class="sub">
        有效期至 {{info.date}}
      </div>
      <div class="amount">
        <div class="unit">¥</div>
        <div class="num">{{info.amount}}</div>
      </div>
    </div>
    <div class="bottom">
      <div class="limit">
        <div v-if="info.valid">
          {{info.city}}, {{info.limit}}时段可用
        </div>
        <div v-else>
          目前不可用
        </div>
      </div>
      <div class="detail">查看详情</div>
    </div>
  </div>
</template>

<script>

  const { getTimeWithModal } = wx.proxy

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
          getTimeWithModal(this.$el._wxComponent)
          this.selected = !this.selected
        }
      }
    }
  }
</script>

<style>

  .coupon {
    width: 100%;
    height: 130px;
    box-sizing: border-box;
    position: relative;
    padding: 12px;
    border-bottom: #cba solid 5px;
    border-radius: 0 0 5px 5px;
    font-size: 12px;
    margin: 10px 0;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    color: #654;
  }

  .coupon.selected {
    border-color: #fc9153;
    background-image: radial-gradient(circle at bottom right, rgba(252, 145, 83, 0.1) 0, #fff 80%);
  }

  .coupon.invalid {
    color: #aaa;
    border-color: #ccc;
  }

  .coupon.invalid .desc .amount {
    color: #999;
  }

  .coupon .desc .main {
    font-size: 16px;
  }

  .coupon .desc .amount {
    position: absolute;
    top: 2px;
    right: 12px;
    color: #432;
  }

  .coupon .desc .amount .unit {
    display: inline-block;
    font-size: 14px;
  }

  .coupon .desc .amount .num {
    display: inline-block;
    font-size: 42px;
  }

  .coupon .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border-top: 1px dashed rgba(0, 0, 0, 0.1);
  }

  .coupon .bottom .limit {
    float: left;
  }

  .coupon .bottom .detail {
    float: right;
  }

</style>


