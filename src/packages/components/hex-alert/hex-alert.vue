<template>
  <u-popup
    v-model="showDialog"
    mode="center"
    border-radius="14"
    height="auto"
    width="640rpx"
    :mask-close-able="false"
    @close="clickCancel"
  >
    <view class="hex-dialog-wrapper">
      <view class="hex-dialog-title">{{ alertTitle }}</view>
      <view class="hex-dialog-warpper">
        <view class="hex-dialog-content" v-show="alertContent.length !== 0">{{
          alertContent
        }}</view>
        <view
          class="hex-dialog-content"
          v-show="alertContentTwo.length !== 0"
          >{{ alertContentTwo }}</view
        >
        <slot></slot>
      </view>
      <view class="hex-line"></view>
      <view class="hex-dialog-bottom-wrapper">
        <view class="hex-dialog-cancel" @click="clickCancel">{{
          alertLeftText
        }}</view>
        <view class="hex-dialog-cloum-line"></view>
        <view
          class="hex-dialog-confirm"
          :style="{ color: confirmColor }"
          @click="clickConfirm"
          >{{ alertRightText }}</view
        >
      </view>
    </view>
  </u-popup>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  showDialog: {
    type: Boolean,
    default: false,
  },

  alertTitle: {
    type: String,
    default: "",
  },
  alertContent: {
    type: String,
    default: "",
  },
  alertContentTwo: {
    type: String,
    default: "",
  },
  alertLeftText: {
    type: String,
    default: "取消",
  },
  alertRightText: {
    type: String,
    default: "确定",
  },
  confirmColor: {
    type: String,
    default: "#377ef6",
  }
});

let emit = defineEmits(["clickConfirm", "clickCancel"]);

//取消
function clickCancel() {
  emit("clickCancel");
}

//确定
function clickConfirm() {
  emit("clickConfirm");
}
</script>

<style lang="scss">
.hex-dialog-wrapper {
  display: flex;
  flex-direction: column;
  background-color: white;
}
.hex-dialog-title {
  font-size: 36rpx;
  font-weight: 600;
  color: rgba(0, 9, 28, 0.85);
  font-weight: bold;
  margin-left: 48rpx;
  margin-right: 48rpx;
  margin-top: 48rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.hex-dialog-warpper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 48rpx;
  margin-top: 16rpx;
}
.hex-dialog-content {
  margin-left: 48rpx;
  margin-right: 48rpx;
  margin-top: 8rpx;
  font-size: 32rpx;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
}
.hex-line {
  height: 2rpx;
  background-color: #ebedf0;
}
.hex-dialog-bottom-wrapper {
  height: 104rpx;
  display: flex;
  flex-direction: row;
  .hex-dialog-cancel {
    height: 104rpx;
    line-height: 104rpx;
    flex: 1;
    color: rgba(0, 9, 28, 0.85);
    font-size: 32rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .hex-dialog-cloum-line {
    width: 2rpx;
    height: 104rpx;
    background-color: #ebedf0;
  }
  .hex-dialog-confirm {
    height: 104rpx;
    line-height: 104rpx;
    flex: 1;
    color: #377ef6;
    font-size: 32rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
