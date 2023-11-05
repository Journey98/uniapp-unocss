<template>
  <hex-popup
    v-model="show"
    mode="bottom"
    border-radius="40"
    :height="height"
    :closeable="closeable"
    :custom-style="customStyle"
    @close="
      $emit('update:show', false);
      $emit('close');
    "
    @open="$emit('open')"
    safe-area-inset-bottom
  >
    <view class="hex-popup-bottom-container">
      <view
        class="hex-popup-bottom-container-header"
        :class="{ 'header-sticky': isStickyHeader }"
        v-if="isShowHeader"
      >
        <slot name="header">
          <view class="title-box">
            <image
              src="@/uni_modules/hex-ui/static/common/goback_black.png"
              mode="scaleToFill"
              class="goback-icon"
              v-if="isShowGoback"
              @click="$emit('goback')"
            />
            <view class="title">{{ title }}</view>
            <view
              class="goback-box"
              v-if="isShowGoback"
              @click="$emit('goback')"
            ></view>
          </view>
        </slot>
      </view>
      <view
        class="hex-popup-bottom-container-main"
        :class="{ 'main-sticky': isStickyHeader }"
        v-if="isShowMain"
      >
        <slot name="main"
          ><view class="hex-popup-bottom-content" v-html="content"></view
        ></slot>
      </view>
      <slot></slot>
      <footer v-if="isShowFooter">
        <slot name="footer">
          <view
            class="button-box"
            :style="getFooterButtonBoxStyle()"
            :class="{ 'button-box-border-top': isShowButtonBorderTop }"
          >
            <view
              v-if="isShowLeft"
              class="left-button"
              :class="{ 'one-button': !isShowRight }"
              @click="clickLeftButton"
              >{{ leftTitle }}</view
            >
            <view
              v-if="isShowRight"
              class="right-button"
              :class="{
                'one-button': !isShowLeft,
                'dark-button': rightButtonType === 2,
                'dark-disabled-button': rightButtonType === 3,
              }"
              :style="getRightButtonStyle()"
              @click="clickRightButton"
              >{{ rightTitle }}</view
            >
          </view>
        </slot>
      </footer>
    </view>
  </hex-popup>
</template>
<script setup lang="ts">
import { ref, computed, watch } from "vue";

let emit = defineEmits([
  "update:show",
  "clickLeft",
  "clickRight",
  "goback",
  "close",
  "open",
]);

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
  closeable: {
    type: Boolean,
    default: true,
  },
  height: {
    type: String,
    default: "auto",
  },
  isShowGoback: {
    type: Boolean,
    default: false,
  },
  //是否显示头部，默认title
  isShowHeader: {
    type: Boolean,
    default: true,
  },
  //是否显示中间内容，默认是content
  isShowMain: {
    type: Boolean,
    default: true,
  },
  //是否显示底部，默认是底部按钮
  isShowFooter: {
    type: Boolean,
    default: true,
  },
  //左按钮默认标题
  leftTitle: {
    type: String,
    default: "取消",
  },
  //右按钮默认标题
  rightTitle: {
    type: String,
    default: "确定",
  },
  //是否显示左侧按钮(灰色背景按钮)
  isShowLeft: {
    type: Boolean,
    default: true,
  },
  //是否显示右侧按钮(蓝色背景按钮)
  isShowRight: {
    type: Boolean,
    default: true,
  },
  //底部按钮MarginTop，默认64rpx
  footerButtonMarginTop: {
    type: String,
    default: "40rpx",
  },
  rightButtonStyle: {
    type: String,
    default: "",
  },
  //右侧按钮背景色 1 浅蓝色 2 深蓝色 3 深蓝色禁用
  rightButtonType: {
    type: Number,
    default: 1,
  },
  customStyle: {
    type: Object,
    default: {},
  },
  //是否显示按钮顶部分割线，默认不显示
  isShowButtonBorderTop: {
    type: Boolean,
    default: false,
  },
  //header固定在顶部
  isStickyHeader: {
    type: Boolean,
    default: false,
  },
});

//底部按钮的Style
function getFooterButtonBoxStyle() {
  return {
    "margin-top": props.footerButtonMarginTop,
  };
}

function getRightButtonStyle() {
  return props.rightButtonStyle;
}
//取消
function clickLeftButton() {
  emit("clickLeft");
}

//确定
function clickRightButton() {
  if (props.rightButtonType !== 3) {
    emit("clickRight");
  }
}
</script>
<style lang="scss">
.hex-popup-bottom-container {
  .hex-popup-bottom-container-header {
    .title-box {
      display: flex;
      padding-left: 48rpx;
      padding-right: 48rpx;
      padding-top: 48rpx;
      padding-bottom: 44rpx;
      align-items: center;
      position: relative;
      background: #ffffff;
      .goback-icon {
        width: 14rpx;
        height: 24rpx;
        margin-right: 24rpx;
      }
      .title {
        max-width: 496rpx;
        height: 48rpx;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: left;
        line-height: 48rpx;
        font-size: 40rpx;
        font-weight: 600;
        color: #1c1c1d;
        position: sticky;
        top: 0;
        background-color: #ffffff;
        z-index: 1;
      }
      .goback-box {
        width: 60rpx;
        height: 60rpx;
        position: absolute;
        top: 40rpx;
        left: 24rpx;
      }
    }
  }
  .header-sticky {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: #ffffff;
  }

  .hex-popup-bottom-container-main {
    .hex-popup-bottom-content {
      margin: 0 48rpx;
      font-size: 28rpx;
      color: #46484b;
      font-weight: 500;
      min-height: 48rpx;
      line-height: 48rpx;
    }
  }
  .main-sticky {
    margin-top: 112rpx;
  }

  .button-box {
    height: 128rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    .left-button {
      height: 96rpx;
      line-height: 96rpx;
      flex: 1;
      color: #1c1c1d;
      background: rgba(28, 28, 29, 0.04);
      border-radius: 20rpx;
      font-size: 32rpx;
      font-weight: 500;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: 48rpx;
    }

    .right-button {
      height: 96rpx;
      line-height: 96rpx;
      flex: 1;
      color: #196fff;
      background: rgba(25, 111, 255, 0.1);
      border-radius: 20rpx;
      font-size: 32rpx;
      font-weight: 500;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 48rpx;
      margin-left: 32rpx;
    }
    .dark-button {
      background: #196fff;
      color: #ffffff;
    }
    .dark-disabled-button {
      background: #a3c5ff;
      color: #ffffff;
    }
    .one-button {
      margin: 0 48rpx;
    }
  }
  .button-box-border-top {
    border-top: 1rpx solid rgba(0, 9, 28, 0.08);
  }
}
</style>
