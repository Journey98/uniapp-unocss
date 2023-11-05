<template>
  <view class="hex-cell-item-box" @click="clickItem()">
    <view class="left">
      <image
        v-if="leftIcon.length > 0"
        class="left-image"
        :src="leftIcon"
        mode="scaleToFill"
      />
      <text class="title">{{ title }}</text>
    </view>
    <view class="right">
      <text class="subtitle" :style="{'color': subtitleColor}">{{ subtitle }}</text>
      <slot></slot>
      <image
        v-if="isShowGrayArrowIcon == true"
        class="right-image"
        :src="rightIcon"
        mode="scaleToFill"
      />
      <view v-else class="right-image"></view>
    </view>
  </view>
</template>
<script setup lang="ts">
import CellArrowIcon from "../../static/cell_item_black_rihgt_arrow.png";

const props = defineProps({
  //标题
  title: {
    type: String,
    default: "",
  },
  leftIcon: {
    type: String,
    default: "",
  },
  //副标题
  subtitle: {
    type: String,
    default: "",
  },
  //副标题颜色，默认#46484B
  subtitleColor: {
    type: String,
    default: "#46484B",
  },
  //右侧图标，默认灰色返回箭头
  rightIcon: {
    type: String,
    default: CellArrowIcon,
  },
  isShowGrayArrowIcon: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["clickItem"]);

function clickItem() {
  emit("clickItem");
}
</script>
<style lang="scss">
.hex-cell-item-box {
  margin: 0 32rpx 0 36rpx;
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx 0;
  .left {
    margin-right: 10rpx;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    .left-image {
      margin-right: 16rpx;
      width: 32rpx;
      height: 32rpx;
    }
    .title {
      flex-shrink: 0;
      font-size: 32rpx;
      font-weight: 500;
      color: #1c1c1d;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .right-image {
      margin-left: 16rpx;
      width: 12rpx;
      height: 20rpx;
    }
    .subtitle {
      font-size: 26rpx;
      font-weight: 500;
      color: #46484B;
    }
  }
}
</style>
