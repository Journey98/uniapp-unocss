<template>
  <view>
    <view
      v-if="showStatus"
      class="hex-toast-container active"
      :class="verticalAlign"
      :style="verticalAlign === 'center' ? verticalCenterStyle : ''"
    >
      <text class="hex-toast-message">{{ message }}</text>
    </view>
  </view>
</template>
<script>
export default {
  name: "hex-toast",
  props: {
    duration: {
      type: Number,
      default: 1500,
    },
    verticalAlign: {
      type: String,
      default: "center",
    },
  },
  data() {
    return {
      showStatus: false,
      message: "",
    };
  },
  computed: {
    verticalCenterStyle() {
      const value = uni.getSystemInfoSync().screenHeight / 2;
      return `bottom: ${value}px;`;
    },
  },
  methods: {
    show(msg) {
      this.showStatus = true;
      this.message = msg;
      setTimeout(() => {
        this.showStatus = false;
        this.message = "";
      }, this.duration);
    },
  },
};
</script>
<style>
.hex-toast-container {
  position: fixed;
  z-index: 11009;
  width: 100%;
  display: flex;
  justify-content: center;
  left: 0;
}

.hex-toast-container.top {
  /* #ifdef H5 */
  top: 88px;
  /* #endif */
  /* #ifndef H5 */
  top: 44px;
  /* #endif */
}

.hex-toast-container.bottom {
  bottom: 50px;
}

.hex-toast-message {
  max-width: 80%;
  padding: 18rpx 48rpx;
  font-size: 28rpx;
  text-align: center;
  border-radius: 16rpx;
  color: #ffffff;
  font-weight: 500;
  line-height: 48rpx;
  background: #1c1c1d;
}
</style>
