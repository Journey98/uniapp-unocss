<template>
  <view
    class="hex-input-box"
    :class="{ 'hex-input-box-border-bottom': isShowBorderBottom }"
    :style="{ marginTop: marginTop }"
  >
    <input
      v-if="getInputType() == 'number'"
      class="hex-input-content"
      :style="customStyle"
      @input="inputContent"
      @blur="inputBlur"
      @focus="inputFocus"
      @confirm="confirm"
      @keyboardheightchange="keyboardheightchange"
      :placeholder="placeholder"
      :focus="isFocus"
      type="number"
      v-model="inputContentValue"
      :maxlength="maxlength"
      :disabled="disabled"
      height="96"
      :placeholder-style="placeholderStyle"
      :adjust-position="adjustPosition"
      :hold-keyboard="holdKeyboard"
    />
    <input
      v-else-if="getInputType() == 'password'"
      class="hex-input-content"
      :style="customStyle"
      @input="inputContent"
      @blur="inputBlur"
      @focus="inputFocus"
      @confirm="confirm"
      @keyboardheightchange="keyboardheightchange"
      :placeholder="placeholder"
      type="password"
      :focus="isFocus"
      v-model="inputContentValue"
      :maxlength="maxlength"
      :disabled="disabled"
      height="96"
      :placeholder-style="placeholderStyle"
      :adjust-position="adjustPosition"
      :hold-keyboard="holdKeyboard"
    />
    <input
      v-else
      class="hex-input-content"
      :style="customStyle"
      @input="inputContent"
      @blur="inputBlur"
      @focus="inputFocus"
      @confirm="confirm"
      @keyboardheightchange="keyboardheightchange"
      :placeholder="placeholder"
      :focus="isFocus"
      v-model="inputContentValue"
      :maxlength="maxlength"
      :disabled="disabled"
      height="96"
      :placeholder-style="placeholderStyle"
      :adjust-position="adjustPosition"
      :hold-keyboard="holdKeyboard"
    />
    <view
      class="show-clearable"
      v-if="getIsShowClearable()"
      @click="clickClearable()"
    >
      <image class="clearable-icon" :src="inputClearable" mode="scaleToFill" />
    </view>
    <view
      class="show-password"
      v-if="password.length > 0"
      @click="clickShowPassword()"
    >
      <image
        v-if="isShowPassword"
        class="eye-icon"
        :src="eyeFilledIcon"
        mode="scaleToFill"
      />
      <image
        v-else
        class="eye-close-icon"
        :src="eyeCloseFilledIcon"
        mode="scaleToFill"
      />
    </view>
  </view>
</template>
<script setup lang="ts">
import eyeFilledIcon from "@/uni_modules/hex-ui/static/eye_filled.png";
import eyeCloseFilledIcon from "@/uni_modules/hex-ui/static/eyeclose_filled.png";
import inputClearable from "@/uni_modules/hex-ui/static/input_clearable.png";
import { ref, computed, watch } from "vue";
import { onLoad } from "@dcloudio/uni-app";
const passwordType = ref("password");
const isShowPassword = ref(false);
const password = ref("");
const inputContentValue = ref("");
let isFocus = ref(false);

const props = defineProps({
  //placeholder
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  maxlength: {
    type: Number,
    default: 1000,
  },
  content: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  marginTop: {
    type: String,
    default: "0",
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  isNumberSplit: {
    type: Boolean,
    default: false,
  },
  //是否显示底部横线，默认显示
  isShowBorderBottom: {
    type: Boolean,
    default: true,
  },
  //获取焦点
  focus: {
    type: Boolean,
    default: false,
  },
  //focus时，点击页面的时候不收起键盘
  holdKeyboard: {
    type: Boolean,
    default: false,
  },
  //键盘弹起时，是否自动上推页面
  adjustPosition: {
    type: Boolean,
    default: true,
  },
  placeholderStyle: {
    type: String,
    default: "font-size : 32rpx; font-weight : 400; color:#9A9C9F;",
  },
  customStyle: {
    type: String,
    default: "",
  },
});

const defaultContent = computed(() => {
  return props.content;
});

watch(defaultContent, (newVal, oldVal) => {
  let content = newVal;
  //#ifndef H5
  if (props.isNumberSplit && newVal.length > 0) {
    content = newVal
      .replace(/\D/g, "")
      .replace(/^/, "$& ")
      .replace(/....(?!$)/g, "$& ");
  }
  //#endif
  inputContentValue.value = content;
});
const focus = computed(() => {
  return props.focus;
});

watch(focus, (newVal, oldVal) => {
  isFocus.value = newVal;
});
const emit = defineEmits([
  "input",
  "blur",
  "focus",
  "keyboardheightchange",
  "confirm",
]);
onLoad((option) => {
  let content = props.content;
  //#ifndef H5
  if (props.isNumberSplit && content.length > 0) {
    content = content
      .replace(/\D/g, "")
      .replace(/^/, "$& ")
      .replace(/....(?!$)/g, "$& ");
  }
  //#endif
  inputContentValue.value = content;
});
function getInputType() {
  if (props.type == "password") {
    return passwordType.value;
  } else {
    return props.type;
  }
}
function getIsShowClearable() {
  return (
    (inputContentValue.value.length > 0 || password.value.length > 0) &&
    isFocus.value
  );
}
function inputContent(e: any) {
  if (props.type == "password") {
    password.value = e.detail.value;
  }
  let content = e.detail.value;

  //#ifndef H5
  if (props.isNumberSplit) {
    content = content
      .replace(/\D/g, "")
      .replace(/^/, "$& ")
      .replace(/....(?!$)/g, "$& ");
    inputContentValue.value = content;
    //取消空格
    content = content.replace(/[, ]/g, "");
  } else {
    content = content.replace(/[, ]/g, ""); //取消空格
    inputContentValue.value = content;
  }
  //#endif

  //#ifdef H5
  inputContentValue.value = content;
  //#endif

  emit("input", content);
}

//失去焦点
function inputBlur() {
  //#ifndef H5
  if (props.clearable) {
    setTimeout(() => {
      isFocus.value = false;
    }, 100);
  }
  //#endif
  emit("blur");
}
//获取焦点
function inputFocus(e: any) {
  //#ifndef H5
  if (props.clearable) {
    setTimeout(() => {
      isFocus.value = true;
    }, 100);
  }
  //#endif
  emit("focus", e);
}
//键盘高度改变
function keyboardheightchange(e: any) {
  emit("keyboardheightchange", e);
}
//点击键盘完成
function confirm() {
  emit("confirm");
}
//点击清空
function clickClearable() {
  password.value = "";
  inputContentValue.value = "";
  emit("input", "");
}
function clickShowPassword() {
  isShowPassword.value = !isShowPassword.value;
  if (isShowPassword.value) {
    passwordType.value = "text";
  } else {
    passwordType.value = "password";
  }
}
</script>
<style lang="scss">
.hex-input-box-border-bottom {
  border-bottom: 2rpx solid #eeeeee;
}
.hex-input-box {
  margin: 0 32rpx;
  height: 96rpx;
  display: flex;
  align-items: center;
  .hex-input-content {
    flex-grow: 1;
    height: 96rpx;
    font-size: 36rpx;
    font-weight: 500;
    color: #1c1c1d;
  }
  .show-clearable {
    height: 96rpx;
    width: 60rpx;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    z-index: 1000;
    .clearable-icon {
      height: 32rpx;
      width: 32rpx;
    }
  }
  .show-password {
    height: 96rpx;
    width: 70rpx;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .eye-icon {
      // margin-top: 10px;
      margin-left: 10rpx;
      width: 34rpx;
      height: 32rpx;
    }
    .eye-close-icon {
      margin-left: 10rpx;
      width: 32rpx;
      height: 16rpx;
    }
  }
}
</style>
