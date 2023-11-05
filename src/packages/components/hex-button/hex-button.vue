<template>
  <button
    id="hex-wave-btn"
    class="hex-btn hex-line-1 hex-fix-ios-appearance"
    :class="[
      'hex-size-' + size,
      loading ? 'hex-loading' : '',
      shape == 'circle' ? 'hex-round-circle' : '',
      hairLine ? showHairLineBorder : 'hex-btn--bold-border',
      'hex-btn--' + type,
      disabled ? `hex-btn--${type}--disabled` : '',
    ]"
    :disabled="disabled"
		:open-type="openType"
    :style="[
      customStyle,
      {
        overflow: 'visible',
      },
    ]"
    @tap.stop="click($event)"
		@getphonenumber="getphonenumber"
    @getuserinfo="getuserinfo"
		@error="error"
		@opensetting="opensetting"
		@launchapp="launchapp"
    :hover-class="getHoverClass"
    :loading="loading"
  >
    <slot></slot>
  </button>
</template>

<script>
/**
 * button 按钮
 * @description Button 按钮
 * @property {String} size 按钮的大小
 * @property {String} type 按钮的样式类型
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} hair-line 是否显示按钮的细边框(默认true)
 * @property {Boolean} shape 按钮外观形状，见文档说明
 * @property {Boolean} loading 按钮名称前是否带 loading 图标
 * @property {String} hover-class 指定按钮按下去的样式类。当 hover-class="none" 时，没有点击态效果
 * @property {Object} custom-style 对按钮的自定义样式，对象形式，见文档说明
 * @event {Function} click 按钮点击
 * @example <hex-button>主要按钮</hex-button>
 */
export default {
  name: "hex-button",
  emits: ["click", "getphonenumber", "getuserinfo", "error", "opensetting", "launchapp"],
  props: {
    // 是否细边框
    hairLine: {
      type: Boolean,
      default: true,
    },
    // 按钮的预置样式，primary，minor，info
    type: {
      type: String,
      default: "primary",
    },
    // 按钮尺寸，default，medium，mini
    size: {
      type: String,
      default: "default",
    },
    // 按钮形状，circle（两边为半圆），square（带圆角）
    shape: {
      type: String,
      default: "square",
    },
    // 是否禁止状态
    disabled: {
      type: Boolean,
      default: false,
    },
    // 是否加载中
    loading: {
      type: Boolean,
      default: false,
    },
    // 手指按（触摸）按钮时按钮时的背景颜色
    hoverBgColor: {
      type: String,
      default: "",
    },
    // 按下的类名
    hoverClass: {
      type: String,
      default: "",
    },
    // 自定义样式，对象形式
    customStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    // 节流，一定时间内只能触发一次
    throttleTime: {
      type: [String, Number],
      default: 500,
    },
    timerId: {
      type: [String, Number],
    },
    // 开放能力，具体请看uniapp稳定关于button组件部分说明
		// https://uniapp.dcloud.io/component/button
		openType: {
			type: String,
			default: ''
		},
  },
  computed: {
    // 当没有传bgColor变量时，按钮按下去的颜色类名
    getHoverClass() {
      if (this.loading || this.disabled || this.hoverClass) return "";
      let hoverClass = "";
      hoverClass = "hex-" + this.type + "-hover";
      return hoverClass;
    },
    // 在'primary'类型下，不显示边框，否则会造成四角有毛刺现象
    showHairLineBorder() {
      if (["primary"].indexOf(this.type) >= 0) {
        return "";
      } else {
        return "hex-hairline-border";
      }
    },
  },
  data() {
    let btnTimerId =
      this.timerId || "button_" + Math.floor(Math.random() * 100000000 + 0);
    return {
      btnTimerId,
    };
  },
  methods: {
    // 按钮点击
    click(e) {
      // 进行节流控制，每this.throttle毫秒内，只在开始处执行
      this.$hex.throttle(
        () => {
          // 如果按钮时disabled和loading状态
          if (this.loading === true || this.disabled === true) return;

          this.$emit("click", e);
        },
        this.throttleTime,
        true,
        this.btnTimerId
      );
    },
    // 下面为对接uniapp官方按钮开放能力事件回调的对接
		getphonenumber(res) {
			this.$emit('getphonenumber', res);
		},
		getuserinfo(res) {
			this.$emit('getuserinfo', res);
		},
		error(res) {
			this.$emit('error', res);
		},
		opensetting(res) {
			this.$emit('opensetting', res);
		},
		launchapp(res) {
			this.$emit('launchapp', res);
		}
  },
};
</script>

<style scoped lang="scss">
@import "../../libs/css/style.components.scss";
.hex-btn::after {
  border: none;
}

.hex-btn {
  position: relative;
  border: 0;
  border-radius: 20rpx;
  /* #ifndef APP-NVUE */
  display: inline-flex;
  /* #endif */
  // 避免边框某些场景可能被“裁剪”，不能设置为hidden
  overflow: visible;
  line-height: 1;
  @include vue-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 40rpx;
  z-index: 1;
  box-sizing: border-box;
  transition: all 0.15s;
  font-weight: 500;

  &--bold-border {
    border: 1px solid #ffffff;
  }

  &--primary {
    color: #ffffff;
    border-color: $hex-type-primary;
    background-color: $hex-type-primary;
  }

  &--minor {
    color: $hex-type-primary;
    border-color: $hex-type-primary;
    background-color: #ffffff;
  }

  &--error {
    color: #ffffff;
    border-color: $hex-type-error;
    background-color: $hex-type-error;
  }

  &--info {
    color: rgba(0, 9, 28, 0.85);
    border-color: $hex-type-info;
    background-color: #ffffff;
  }

  &--primary--disabled {
    color: #ffffff !important;
    border-color: $hex-type-primary-disabled !important;
    background-color: $hex-type-primary-disabled !important;
  }

  &--minor--disabled {
    color: #b9d1fb !important;
    border-color: #b9d1fb !important;
    background-color: $hex-type-minor-disabled !important;
  }

  &--error--disabled {
    color: #ffffff !important;
    border-color: $hex-type-error-disabled !important;
    background-color: $hex-type-error-disabled !important;
  }

  &--info--disabled {
    color: #b3b6bb !important;
    border-color: $hex-type-info-disabled !important;
    background-color: #ffffff !important;
  }
}

.hex-hairline-border:after {
  content: " ";
  position: absolute;
  pointer-events: none;
  // 设置为border-box，意味着下面的scale缩小为0.5，实际上缩小的是伪元素的内容（border-box意味着内容不含border）
  box-sizing: border-box;
  // 中心点作为变形(scale())的原点
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  left: 0;
  top: 0;
  width: 199.8%;
  height: 199.7%;
  -webkit-transform: scale(0.5, 0.5);
  transform: scale(0.5, 0.5);
  border: 2rpx solid rgba(0, 9, 28, 0.16);
  z-index: 1;
}
:deep(uni-button:after){
  border-radius: 20rpx;
}

.hex-round-circle {
  border-radius: 100rpx;
}

.hex-round-circle::after {
  border-radius: 100rpx;
}

.hex-loading::after {
  background-color: hsla(0, 0%, 100%, 0.35);
}

.hex-size-default {
  font-size: 32rpx;
  height: 96rpx;
  line-height: 96rpx;
}

.hex-size-medium {
  /* #ifndef APP-NVUE */
  display: inline-flex;
  /* #endif */
  width: auto;
  font-size: 28rpx;
  height: 64rpx;
  line-height: 64rpx;
  padding: 0 32rpx;
}

.hex-size-mini {
  /* #ifndef APP-NVUE */
  display: inline-flex;
  /* #endif */
  width: auto;
  font-size: 24rpx;
  padding-top: 1px;
  height: 48rpx;
  line-height: 48rpx;
  padding: 0 24rpx;
}

.hex-default-hover {
  color: $hex-type-primary-dark !important;
  border-color: $hex-type-primary-dark !important;
  background-color: $hex-type-primary-light !important;
}

.hex-primary-hover {
  background: $hex-type-primary-dark !important;
  color: #cfd4dc;
}

.hex-minor-hover {
  background: $hex-type-minor-dark !important;
  color: $hex-type-primary;
}

.hex-info-hover {
  background: $hex-type-info-dark !important;
  color: #232a39;
}

.hex-error-hover {
  background: $hex-type-error-dark !important;
  color: #fff;
}
</style>
