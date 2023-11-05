<!-- 返回 -->
<template>
  <u-navbar
    :height="navBarHeight"
    :is-back="false"
    :title="getTitle()"
    title-size="36"
    title-color="#1c1c1d"
    title-bold
    :border-bottom="false"
    :background="background"
  >
    <view class="slot-wrap">
      <view
        class="navigation-left-one-wrapper"
        @click="clickLeftOne()"
        v-show="isShowLeftOne"
      >
        <image
          v-if="isWhiteBack"
          class="navigation-left-one"
          src="@/uni_modules/hex-ui/static/common/goback_white.png"
          mode="aspectFit"
        />
        <image
          v-else
          class="navigation-left-one"
          src="@/uni_modules/hex-ui/static/common/goback_black.png"
          mode="aspectFit"
        />
      </view>
      <image
        class="navigation-left-two"
        src="@/uni_modules/hex-ui/static/home.png"
        mode="scaleToFill"
        v-show="isShowLeftTwo"
        @click="clickLeftTwo()"
      />

      <view
        class="navigation-left-title"
        :style="{
          marginLeft: marginLeft + 'rpx',
          color: isWhiteBack ? '#ffffff' : '#1c1c1d',
        }"
        v-if="title && !isTitleCenter"
        >{{ title }}</view
      >
    </view>
    <slot></slot>
  </u-navbar>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  //标题
  title: {
    type: String,
    default: "",
  },
  //是否显示左一
  isShowLeftOne: {
    type: Boolean,
    default: true,
  },
  //打开左一默认返回，默认返回上一页
  leftOneDefaultBack: {
    type: Boolean,
    default: false,
  },
  //是否显示左二
  isShowLeftTwo: {
    type: Boolean,
    default: false,
  },
  //navbar背景色
  background: {
    type: Object,
    default: { background: "#ffffff" },
  },
  //title是否居中显示
  isTitleCenter: {
    type: Boolean,
    default: true,
  },
  //白色返回按钮
  isWhiteBack: {
    type: Boolean,
    default: false,
  },
  // 标题距离左侧距离
  marginLeft: {
    type: String,
    default: "-6",
  },
});

const emit = defineEmits(["clickLeftOne", "clickLeftTwo"]);

let navBarHeight = ref(44);
// #ifdef MP-WEIXIN
// @ts-ignore
const custom = wx.getMenuButtonBoundingClientRect();
navBarHeight.value = custom.height + 13;
// #endif

function getTitle() {
  return props.isTitleCenter ? props.title : "";
}

function clickLeftOne() {
  emit("clickLeftOne");
  if (props.leftOneDefaultBack) {
    uni.navigateBack({
      delta: 1,
    });
  }
}

function clickLeftTwo() {
  emit("clickLeftTwo");
}
</script>

<style lang="scss">
.slot-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  /* 如果您想让slot内容占满整个导航栏的宽度 */
  /* flex: 1; */
  /* 如果您想让slot内容与导航栏左右有空隙 */
  padding-left: 40rpx;

  .navigation-left-one-wrapper {
    height: 48rpx;
    width: 48rpx;
    display: flex;
    flex-direction: row;
    align-items: center;

    .navigation-left-one {
      width: 18rpx;
      height: 32rpx;
    }
  }

  .navigation-left-two {
    width: 48rpx;
    height: 48rpx;
  }

  .navigation-left-title {
    width: 362rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 36rpx;
    font-weight: 500;
    color: #1c1c1d;
    line-height: 40rpx;
  }
}
</style>
