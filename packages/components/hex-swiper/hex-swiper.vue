<template>
  <swiper
    class="hex-swiper-container"
    :previous-margin="previousMargin"
    :next-margin="nextMargin"
    :easing-function="easingFunction"
    :indicator-dots="indicatorDots"
    :indicator-color="indicatorColor"
    :indicator-active-color="indicatorActiveColor"
    :circular="circular"
    :autoplay="autoplay"
    :interval="interval"
    :duration="duration"
    :current="current"
    :vertical="vertical"
    @change="swiperChange"
  >
    <swiper-item
      :class="currentIndex == index ? 'swiper-item' : 'swiper-item side'"
      v-for="(item, index) in list"
      :key="item[urlKey]"
    >
      <view class="img-box">
        <image
          @click="clickImg(item)"
          :class="currentIndex == index ? 'item-img' : 'item-img-side'"
          :style="{
            animation: dontFirstAnimation ? 'none' : '',
          }"
          :src="item[urlKey]"
          lazy-load
          @load="loadImage"
          mode="aspectFill"
        ></image>
        <view class="num-box" v-if="isNumShow">
          <view class="big-text">{{ index + 1 }}</view>
          <view class="small-text">/{{ list.length }}</view>
        </view>
      </view>
    </swiper-item>
  </swiper>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    urlKey: {
      type: String,
      default() {
        return "";
      },
    },
    // 是否自动切换
    autoplay: {
      type: Boolean,
      default: false,
    },
    // 自动切换时间间隔
    interval: {
      type: Number,
      default: 5000,
    },
    // 当前所在滑块的 index
    current: {
      type: Number,
      default: 0,
    },
    // 滑动动画时长
    duration: {
      type: Number,
      default: 500,
    },
    // 是否采用衔接滑动，即播放到末尾后重新回到开头
    circular: {
      type: Boolean,
      default: false,
    },
    // 滑动方向是否为纵向
    vertical: {
      type: Boolean,
      default: false,
    },
    // 是否显示面板指示点
    indicatorDots: {
      type: Boolean,
      default: false,
    },
    // 面板指示点颜色
    indicatorColor: {
      type: String,
      default: "rgba(0, 0, 0, 0.3)",
    },
    // 当前选中的指示点颜色
    indicatorActiveColor: {
      type: String,
      default: "#000000",
    },
    // 前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值
    previousMargin: {
      type: String,
      default: "60rpx",
    },
    // 后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值
    nextMargin: {
      type: String,
      default() {
        return "60rpx";
      },
    },
    // 指定 swiper 切换缓动动画类型，有效值：default、linear、easeInCubic、easeOutCubic、easeInOutCubic
    easingFunction: {
      type: String,
      default() {
        return "default";
      },
    },

    // 大图的高度
    bigHeight: {
      type: String,
      default: "854rpx",
    },
    // 大图的宽度
    bigWidth: {
      type: String,
      default: "596rpx",
    },
    // 小图的高度
    minHeight: {
      ype: String,
      default: "816rpx",
    },
    // 小图的宽度
    minWidth: {
      ype: String,
      default: "854rpx",
    },
  },
  data() {
    return {
      currentIndex: 0,
      dontFirstAnimation: true,
      isNumShow: false,
    };
  },
  watch: {
    list() {
      this.isNumShow = false;
    },
  },
  methods: {
    swiperChange(e) {
      this.dontFirstAnimation = false;
      this.currentIndex = e.detail.current;
      this.$emit("swiperChange", this.currentIndex);
    },
    clickImg(item) {
      this.$emit("selected", item, this.currentIndex);
    },
    loadImage() {
      this.isNumShow = true;
    },
  },
};
</script>
<style lang="scss">
.hex-swiper-container {
  width: 100%;
  height: 904rpx;

  .swiper-item {
    width: 596rpx;
    height: 854rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    .img-box {
      position: relative;
      height: 854rpx;
      .item-img {
        width: 596rpx;
        height: 854rpx;
        border-radius: 14rpx;
        animation: to-big 0.3s;
      }
      .item-img-side {
        width: 596rpx;
        height: 816rpx;
        border-radius: 14rpx;
        animation: to-mini 0.3s;
      }
      .num-box {
        position: absolute;
        width: 76rpx;
        height: 48rpx;
        background: rgba(0, 9, 28, 0.5);
        border-radius: 24rpx;
        display: flex;
        justify-content: center;
        line-height: 48rpx;
        right: 24rpx;
        bottom: 24rpx;
        font-weight: 500;
        color: #ffffff;
        .big-text {
          font-size: 28rpx;
        }
        .small-text {
          font-size: 24rpx;
          line-height: 54rpx;
        }
      }
    }
  }

  .swiper-item.side {
    width: 596rpx;
    height: 816rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @keyframes to-mini {
    from {
      height: 854rpx;
    }
    to {
      height: 816rpx;
    }
  }
  @keyframes to-big {
    from {
      height: 816rpx;
    }
    to {
      height: 854rpx;
    }
  }
}
</style>
