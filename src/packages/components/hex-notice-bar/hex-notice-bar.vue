<template>
  <view
    v-if="show"
    class="hex-notice-bar"
    :style="{
      background: computeBgColor,
      padding: padding,
	  height: height
    }"
    :class="[type ? `hex-type-${type}-light-bg` : '']"
  >
    <view class="hex-direction-row">
      <view class="hex-icon-wrap">
        <image
          class="hex-left-icon"
          v-if="volumeIcon"
          :src="leftIconSrc ? leftIconSrc : volumeImg"
          mode="aspectFit"
        >
        </image>
      </view>
      <view class="hex-notice-box" id="hex-notice-box">
        <view
          class="hex-notice-content"
          id="hex-notice-content"
          :style="{
            animationDuration: animationDuration,
            animationPlayState: animationPlayState,
            paddingLeft: needPlay ? '100%' : '0',
          }"
        >
          <text
            class="hex-notice-text"
            @tap="click"
            :style="[textStyle]"
            :class="['hex-type-' + type]"
            >{{ showText }}</text
          >
        </view>
      </view>
      <view>
        <slot></slot>
      </view>
      <view class="hex-icon-wrap">
        <image
          @click="getMore"
          class="hex-right-icon"
          v-if="moreIcon"
          :src="rightImg"
          mode="aspectFit"
        >
        </image>
        <image
          @click="close"
          class="hex-right-icon"
          v-if="closeIcon"
          :src="closeImg"
          mode="aspectFit"
        >
        </image>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  emits: ["close", "getMore"],
  props: {
    // 显示的内容，数组
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    // 显示的主题，success|error|primary|info|warning|none
    // none主题默认为透明背景，黑色(contentColor)字体
    type: {
      type: String,
      default: "primary",
    },
    // 是否显示左侧的音量图标
    volumeIcon: {
      type: Boolean,
      default: true,
    },
    // 是否显示右侧的右箭头图标
    moreIcon: {
      type: Boolean,
      default: false,
    },
    // 是否显示右侧的关闭图标
    closeIcon: {
      type: Boolean,
      default: false,
    },
    // 左侧图标自定义
    leftIconSrc: {
      type: String,
      default: "",
    },
    // 是否自动播放
    autoplay: {
      type: Boolean,
      default: true,
    },
    // 是否需要滚动效果
    needPlay: {
      type: Boolean,
      default: true,
    },
    // 是否显示
    show: {
      type: Boolean,
      default: true,
    },
    // 字体大小，单位rpx
    fontSize: {
      type: [Number, String],
      default: 28,
    },
    // 水平滚动时的滚动速度，即每秒滚动多少rpx，这有利于控制文字无论多少时，都能有一个恒定的速度
    speed: {
      type: [Number, String],
      default: 160,
    },
    // 播放状态，play-播放，paused-暂停
    playState: {
      type: String,
      default: "play",
    },
    // 通知的边距
    padding: {
      type: [Number, String],
      default: "20rpx 32rpx",
    },
	// 通知的高度
	height: {
	  type: String,
	  default: "80rpx",
	},
  },
  data() {
    return {
      textWidth: 0, // 滚动的文字宽度
      boxWidth: 0, // 供文字滚动的父盒子的宽度，和前者一起为了计算滚动速度
      animationDuration: "10s", // 动画执行时间
      animationPlayState: "paused", // 动画的开始和结束执行
      showText: "", // 显示的文本
      volumeImg:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IArs4c6QAAAOFQTFRFAAAAAAD/AP//AID/M4D/N3/tM3fuOYD/OoDzN3r0N3/2M3/2OID3NYD4OoP4OYD4NID5N331OID3N373OID4N374NYD4N3/1NoD1NoD5N375OH32OH73OH75N373OH33OID3OH73N374N3/3N3/2N373Nn/3OH73OID3N372N3/3OH/3OH72N3/2N3/4N372N3/2N372N3/2OH/2N373Nn73OH73N3/3OH73N371N373N372N373Nn72N372N332N372N331N372N332Nn32Nn72Nn73Nn72N332N373N372WVT9GgAAAEp0Uk5TAAEBAgoODxIWFxweICIjJCwzQEFERUhKUFBTVltbXWBgZW+Dj5ibnJyip6mqq6usr7Cxs7S8vL3T1NTa2tzi6Ovs7PD0+Pj9/v5yYAIiAAAA20lEQVQ4y2NgGAjAIs2GV17Y1ksZjzSrqoeXlwpueXE7Ly93qAImJgxpdk1PLxclI4gCEUs1dHkpey8vU14GA5ACPkMvL1cWFGlOfS8vZ0UgA6zAwsvLTABFXs7Jy8uYiwGmQMFaAi6l4QUBDjIQvgG6Lwwg8tocDDgV6AoJCQki8TEUqGDjc/Pw8LDgUSAGslaLEgUoVhB0JBjo4PQmLKAcZXEoQAS1CSKo5W0k0VVw6oEiixFnZEGj2xwa3fxGXl5uLHgTjKiVOqEkx0xOogUCIfzJnoiMQ3UAAEAeMwBCG1U8AAAAAElFTkSuQmCC",
      rightImg:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IArs4c6QAAAJ9QTFRFAAAAAP//M5n/K4D/O3b/N3/tMIDvLXjwOXv2N3/2OYD4N3zxN4D5N3/0Nn36NYD0OID3NoD3NYD4OYD4N3/3Nn33NoD4N4D4Nn32NoD5N331N333Nn/2N3/2N372OH73N372N3/4Nn72N373N372N3/3N372N373Nn73N373OH73N372N372N372N372N372N373N372N373Nn72N3721OUtGwAAADR0Uk5TAAEFBg0OEBEbHCQlKi4vMEBCSEhcXmx0dnZ+fo2PlJasrbK0xsfX19jb3N3o6fP19fv7/f8lhaEAAACHSURBVDjLzdJXEoJQEETRJyoGFDOYwJwjcPe/NnfQUyU/zPep6qnpca5KE40NkBTLmgRrOLQUCC5wD5VobOE7kylxBpu6EsMnnDpKtI/wGinhpZDP5SLTD+yaSvRvcO0p4e/h3S0BrAhjSS+FfPH/oaxTG2VZdQdneAzKvFxSrPTTRhNX1fkBdZwRMwl2UGIAAAAASUVORK5CYII=",
      closeImg:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IArs4c6QAAAOFQTFRFAAAAAAD/AID/AFX/Var/QID/M5n/M4D/K4D/O3b/M4j/MID/NnnyOXv2M3/2Onv3M3z4Onz4OYD4NoD4OYD5N3/0N3/5NYD0N336N3/6OID3N374N4D2N4D5OYD3OID3N4D4N371OH33N373N3/1OH73OH/1N3/2OH/2N3/2OH/2OH/3Nn73OH/2OH74N374Nn72OH/2N3/3N331Nn73N372N372N372N373N373N3/3N373N372N372N332N372N372N372Nn72N372N372N373N372Nn73N372N373N372CggCngAAAEp0Uk5TAAECAwMEBQoMDQ8QExseHyMjJCYoLi4wMzhARVRUWmRqa3yCg4SFi42Rk5ekpaqssrO5u8DMzdHS1tfb5OXo6evs7/X3+fv9/v7aWWPAAAAA0ElEQVQ4y2NgGDpAWFyUGZnPKiYuhKJA28tLF4nLqOflpYmigM3Ey0sJwVXx8jJmRbWDx9rLXRbGkfPwsuJGd4WIk5ezBIQp6eLlKITpTmk3L1teEIPPzstVCptPFL28zNgZGDjMvbzksftVy8tLn5HJwMtLA0dgsBh5eampe3kZMuEKLi5LL08vLwtO3AEq4ODlZc+PJ8QFCSgAWuGBzwqQI1XxOZKQNxW8vEzxBRQwqG3wBTWhyAJFtwye6EZLMMoYCQaY5HTwJjmCiXZwAwBYcCT+UOq4PwAAAABJRU5ErkJggg==",
    };
  },
  watch: {
    list: {
      immediate: true,
      handler(val) {
        this.showText = val.join("，");
        this.$nextTick(() => {
          if (this.show) this.initSize();
        });
      },
    },
    playState(val) {
      if (val == "play") this.animationPlayState = "running";
      else this.animationPlayState = "paused";
    },
    speed(val) {
      if (this.show) this.initSize();
    },
  },
  computed: {
    // 计算字体颜色，如果没有自定义的，就用uview主题颜色
    computeColor() {
      // 如果是无主题，就默认使用content-color
      if (this.type == "none") return "#606266";
      else return this.type;
    },
    // 文字内容的样式
    textStyle() {
      let style = {};
      if (this.type == "none") style.color = "#606266";
      style.fontSize = this.fontSize + "rpx";
      return style;
    },
    // 计算背景颜色
    computeBgColor() {
      if (this.type == "none") return "transparent";
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.show) this.initSize();
    });
  },
  methods: {
    initSize() {
      let query = [],
        boxWidth = 0,
        textWidth = 0;
      let textQuery = new Promise((resolve, reject) => {
        uni
          .createSelectorQuery()
          .in(this)
          .select(`#hex-notice-content`)
          .boundingClientRect()
          .exec((ret) => {
            this.textWidth = ret[0].width;
            resolve();
          });
      });
      query.push(textQuery);
      Promise.all(query).then(() => {
        // 根据t=s/v(时间=路程/速度)，这里为何不需要加上#hex-notice-box的宽度，因为中设置了.hex-notice-content样式中设置了padding-left: 100%
        // 恰巧计算出来的结果中已经包含了#hex-notice-box的宽度
        this.animationDuration = `${this.textWidth / uni.upx2px(this.speed)}s`;
        // 这里必须这样开始动画，否则在APP上动画速度不会改变(HX版本2.4.6，IOS13)
        this.animationPlayState = "paused";
        setTimeout(() => {
          if (this.playState == "play" && this.autoplay && this.needPlay)
            this.animationPlayState = "running";
        }, 10);
      });
    },
    // 点击通告栏
    click(index) {
      this.$emit("click");
    },
    // 点击关闭按钮
    close() {
      this.$emit("close");
    },
    // 点击更多箭头按钮
    getMore() {
      this.$emit("getMore");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";

.hex-notice-bar {
  padding: 18rpx 32rpx;
  height: 80rpx;
  box-sizing: border-box;
  overflow: hidden;
}

.hex-direction-row {
  @include vue-flex;
  height: 44rpx;
  align-items: center;
  justify-content: space-between;
}

.hex-left-icon {
  /* #ifndef APP-NVUE */
  display: inline-flex;
  /* #endif */
  align-items: center;
  width: 32rpx;
  height: 32rpx;
}

.hex-notice-box {
  flex: 1;
  @include vue-flex;
  overflow: hidden;
  margin-left: 12rpx;
}

.hex-right-icon {
  width: 32rpx;
  height: 32rpx;
  margin-left: 12rpx;
  display: inline-flex;
  align-items: center;
}

.hex-notice-content {
  animation: hex-loop-animation 10s linear infinite both;
  text-align: right;
  // 这一句很重要，为了能让滚动左右连接起来
  padding-left: 100%;
  @include vue-flex;
  flex-wrap: nowrap;
}

.hex-notice-text {
  font-size: 26rpx;
  word-break: keep-all;
  white-space: nowrap;
}

@keyframes hex-loop-animation {
  0% {
    transform: translate3d(0, 0, 0);
  }

  100% {
    transform: translate3d(-100%, 0, 0);
  }
}
</style>
