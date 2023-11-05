<template>
  <view class="hex-input-verification-code-box" :style="{ marginTop: marginTop }">
    <view class="input-verification-code">
      <input
        placeholder="请输入验证码"
        type="number"
        placeholder-style="font-size : 32rpx; font-weight : 400; color:#9A9C9F;"
        @input="inputValidCode"
      />
    </view>
    <view class="verification-code-box">
      <u-verification-code
        :seconds="seconds"
        :startText="startText"
        :changeText="'xs后重新获取'"
        ref="uCode"
        @change="codeChange"
      ></u-verification-code>
      <view class="verification-code-normal" v-if="canGetCode && isActive" @click="getCode">{{
        tips
      }}</view>
      <view class="verification-code-disable" v-else>{{ tips }}</view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref } from "vue";

const clearable = ref(true);
const tips = ref("获取验证码");
const seconds = ref(60);
const startText = ref("获取验证码");
const uCode = ref<any>(null);

const props = defineProps({
  //获取验证码按钮是否可以点击
  isActive: {
    type: Boolean,
    default: true,
  },
  marginTop: {
    type: String,
    default: "0",
  },
});

let canGetCode = ref(true);

const emit = defineEmits(["validCode", "getCode"]);

function inputValidCode(e: any) {
  emit("validCode", e.detail.value);
}
function codeChange(text: string) {
  tips.value = text;
  canGetCode.value = uCode.value.canGetCode;
  if (text == "重新获取") {
    canGetCode.value = true;
  }
}
function getCode() {
  if (uCode.value.canGetCode) {
    emit("getCode");
  } else {
    uni.showToast({
      title: "倒计时结束后再发送",
      icon: "none",
      mask: true,
    });
  }
}
function start() {
  uCode.value.start();
}
defineExpose({
  start,
});
</script>
<style lang="scss">
.hex-input-verification-code-box {
  margin: 40rpx 32rpx 0 32rpx;
  height: 96rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2rpx solid #eeeeee;
  .input-verification-code {
    flex-grow: 1;
	font-size : 36rpx;
	font-weight: 500;
	color: #1C1C1D;
  }
  .verification-code-box {
    width: 200rpx;
    height: 70rpx;
    flex-shrink: 0;
    .verification-code-normal {
      height: 70rpx;
      width: 200rpx;
      line-height: 70rpx;
      font-size: 28rpx;
      text-align: end;
      font-weight: 500;
      color: #46484B;
    }
    .verification-code-disable {
      height: 70rpx;
      line-height: 70rpx;
      width: 200rpx;
      font-size: 28rpx;
      text-align: end;
      color: #9A9C9F;
    }
  }
}
</style>
