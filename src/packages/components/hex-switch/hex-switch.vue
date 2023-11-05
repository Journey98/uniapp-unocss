<!--开关选择器-->
<template>
  <view
    class="hex-switch-box"
    :class="[isOn === true ? 'hex-switch-on' : '']"
    :style="{ background: isOn ? activeColor : inactiveColor }"
    @click="clickSwitch"
  >
    <view class="hex-switch-node-box">
      <view class="hex-switch-node"></view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  //默认值
  value: {
    type: Boolean,
    default: false,
  },
  // 打开时的背景颜色
  activeColor: {
    type: String,
    default: "#196FFF",
  },
  // 关闭时的背景颜色
  inactiveColor: {
    type: String,
    default: "#CDCED1",
  },
});

const emit = defineEmits(["change"]);

let isOn = ref(false);

watch(
  () => props.value,
  (newValue, oldValue) => {
    isOn.value = newValue;
  }
);

function clickSwitch() {
  isOn.value = !isOn.value;
  emit("change", isOn.value);
}
</script>

<style lang="scss">
.hex-switch-box {
  width: 88rpx;
  height: 48rpx;
  background: #cdced1;
  border-radius: 26rpx;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  .hex-switch-node-box {
    position: relative;
    width: 76rpx;
    height: 40rpx;
    .hex-switch-node {
      position: absolute;
      top: 0;
      left: 0;
      width: 40rpx;
      height: 40rpx;
      background: #ffffff;
      border-radius: 22rpx;
      transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
      transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05),
        -webkit-transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
      transition: transform cubic-bezier(0.3, 1.05, 0.4, 1.05);
      transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
    }
  }
}
.hex-switch-on {
  .hex-switch-node-box {
    .hex-switch-node {
      transform: translateX(86%);
    }
  }
}
</style>
