<template>
  <view class="hex-empty-main-box">
    <view class="hex-empty-main" :style="{ 'margin-top': emptyMarginTop }">
      <image
        class="hex-empty-image"
        :style="emptyViewImgStyle"
        :src="getEmptyViewImg()"
      ></image>
      <text class="hex-empty-title" :style="emptyViewTitleStyle">{{
        getEmptyViewText()
      }}</text>
      <view
        v-if="showReloadButton"
        class="hex-main-reload-btn"
        :style="emptyViewReloadStyle"
        @click="clickReloadButton"
      >
        <image
          v-if="emptyViewReloadImage.length > 0"
          class="hex-main-reload-image"
          :src="emptyViewReloadImage"
        ></image>
        <view class="hex-main-reload-btn-text">{{
          emptyViewReloadBtnText
        }}</view>
      </view>
      <view
        v-if="showCustomerService"
        class="hex-main-customer-service-btn"
        :style="emptyViewCustomerServiceStyle"
        @click="clickCustomerServiceButton"
        >{{ emptyViewCustomerServiceText }}</view
      >
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: "hex-empty",
};
</script>
<script setup lang="ts">
import { ref } from "vue";

interface Props {
  emptyMarginTop?: string; //设置margin-top
  emptyViewText?: string; //空数据描述文字
  emptyViewImg?: string; //空数据图片
  showEmptyViewReload?: boolean; //是否显示空数据图重新加载按钮
  emptyViewReloadText?: string; //空数据点击重新加载文字
  emptyViewReloadImage?: string; //空数据点击重新加载左侧图标
  showEmptyViewCustomerService?: boolean; //是否显示空数据联系客服按钮
  emptyViewCustomerServiceText?: string; //空数据联系客服按钮文字
  isLoadFailed?: boolean; //是否是加载失败
  errorCode?: string; //加载失败的Code
  emptyViewStyle?: undefined; //空数据图样式
  emptyViewImgStyle?: undefined; //空数据图img样式
  emptyViewTitleStyle?: undefined; //空数据图描述文字样式
  emptyViewReloadStyle?: undefined; //空数据图重新加载按钮样式
  emptyViewCustomerServiceStyle?: undefined; //空数据联系客服按钮样式
}

const props = withDefaults(defineProps<Props>(), {
  emptyMarginTop: "40%",
  emptyViewText: "没有数据哦~",
  emptyViewImg:
    "https://hex-mobile-image.hexfuture.cn/mini-program/empty_no_data.png",
  showEmptyViewReload: false,
  emptyViewReloadImage: "",
  emptyViewReloadText: "重新加载",
  showEmptyViewCustomerService: false,
  emptyViewCustomerServiceText: "联系客服",
  isLoadFailed: false,
  errorCode: "",
  emptyViewStyle: undefined,
  emptyViewImgStyle: undefined,
  emptyViewTitleStyle: undefined,
  emptyViewReloadStyle: undefined,
  emptyViewCustomerServiceStyle: undefined,
});

const showCustomerService = ref<Boolean>(true);
const showReloadButton = ref<Boolean>(false);
const emptyViewReloadBtnText = ref<string>(props.emptyViewReloadText);

//获取文字提示
function getEmptyViewText() {
  if (props.isLoadFailed) {
    if (props.errorCode == "999999998") {
      emptyViewReloadBtnText.value = "重新加载";
      return "您的网络罢工了";
    } else {
      emptyViewReloadBtnText.value = "刷新一下";
      return "抱歉！数据加载失败";
    }
  } else {
    return props.emptyViewText;
  }
}
//获取空页面图片
function getEmptyViewImg() {
  if (props.isLoadFailed) {
    showCustomerService.value = props.showEmptyViewCustomerService;
    showReloadButton.value = props.showEmptyViewReload;
    if (props.errorCode == "999999998") {
      return "https://hex-mobile-image.hexfuture.cn/mini-program/empty_no_network.png";
    } else {
      return "https://hex-mobile-image.hexfuture.cn/mini-program/empty_load_failed.png";
    }
  } else {
    showReloadButton.value = props.showEmptyViewReload;
    showCustomerService.value = false;
    return props.emptyViewImg;
  }
}

const emit = defineEmits(["clickReload", "clickCustomerService"]);

function clickReloadButton() {
  emit("clickReload");
}
function clickCustomerServiceButton() {
  emit("clickCustomerService");
}
</script>

<style scoped>
.hex-empty-main-box {
  display: flex;
  justify-content: center;
}
.hex-empty-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50rpx 0rpx;
}
.hex-empty-image {
  width: 200rpx;
  height: 200rpx;
}
.hex-empty-title {
  width: 362rpx;
  margin-top: 48rpx;
  font-size: 28rpx;
  font-weight: 500;
  color: #46484b;
  text-align: center;
}
.hex-main-reload-btn {
  margin-top: 48rpx;
  width: 264rpx;
  height: 80rpx;
  background: #196fff;
  border-radius: 20rpx;
  text-align: center;
  line-height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hex-main-reload-btn-text {
  font-size: 32rpx;
  font-weight: 500;
  color: #ffffff;
}
.hex-main-reload-image {
  width: 28rpx;
  height: 28rpx;
  margin-right: 12rpx;
}
.hex-main-customer-service-btn {
  margin-top: 48rpx;
  width: 264rpx;
  height: 80rpx;
  background: #196fff;
  border-radius: 20rpx;
  font-size: 32rpx;
  font-weight: 500;
  text-align: center;
  line-height: 80rpx;
  color: #ffffff;
}
</style>
