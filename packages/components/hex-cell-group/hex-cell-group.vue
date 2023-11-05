<template>
    <view class="hex-cell-group-box" :class="{'hex-cell-group-box-one-item': isOneItem}" :style="style">
        <slot></slot>
    </view>
</template>
<script setup lang="ts">
const props = defineProps({
  style: {
    type: Object,
    default: {},
  },
  isOneItem: {
    type: Boolean,
    default: false,
  }
});
</script>
<style lang="scss">
  .hex-cell-group-box {
    margin: 0 32rpx;
	padding: 24rpx 0;
    background-color: #FFFFFF;
    border-radius: 20rpx;
    box-shadow: 0rpx 2rpx 8rpx 0rpx rgba(0,0,0,0.06);
    display: flex;
    flex-direction: column;
  }
  .hex-cell-group-box-one-item {
	  padding: 12rpx 0;
  }
</style>