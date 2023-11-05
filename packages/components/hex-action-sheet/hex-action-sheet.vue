<!-- 文件排序 -->
<template>
  <u-popup
    v-model="show"
    mode="bottom"
    border-radius="14"
    height="auto"
    @close="closePopup"
    :safe-area-inset-bottom="true"
  >
    <view
      v-for="(item, index) in itemList"
      v-bind:key="index"
      :class="getItemStyle(index)"
      @click="clickItem(index)"
      >{{ item }}</view
    >
    <view :style="{ height: '24rpx', background: '#F2F4F7' }"></view>
    <view class="hex-action-sheet-cancel" @click="clickCancelButton"> 取消 </view>
  </u-popup>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  selectIndex: {
    type: Number,
    default: 1,
  },
  itemList: {
    type: Array,
  },
  itemColor: {
    type: String,
    default: "#000000",
  },
  selectColor: {
    type: String,
    default: "#4797FF",
  },
  setHideTabbar: {
    type: Boolean,
    default: false,
  },
});

const popupShow = computed(() => {
  return props.show;
});

watch(popupShow, (newVal, oldVal) => {
  if (newVal == true) {
    if (props.setHideTabbar) {
      // uni.hideTabBar();
    }
  } else {
    if (props.setHideTabbar) {
      // uni.showTabBar();
    }
  }
});

//获取排序按时间样式
function getItemStyle(index: Number) {
  if (props.selectIndex === index) {
    return "hex-action-sheet-item-select";
  } else {
    return "hex-action-sheet-item-normal";
  }
}

let emit = defineEmits(["cancel", "clickItem"]);
//取消
function clickCancelButton() {
  emit("cancel");
}
//弹窗消失
function closePopup() {
  emit("cancel");
}
//按照排序条件
function clickItem(index: number) {
  if (index !== props.selectIndex) {
    emit("clickItem", index);
  }
}
</script>

<style lang="scss">
.hex-action-sheet-item-select {
  width: 100%;
  height: 96rpx;
  line-height: 96rpx;
  font-size: 32rpx;
  color: #4797ff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.hex-action-sheet-item-normal {
  width: 100%;
  height: 96rpx;
  line-height: 96rpx;
  font-size: 32rpx;
  color: rgba(0,9,28,0.8500);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.hex-action-sheet-cancel {
  width: 100%;
  height: 96rpx;
  line-height: 96rpx;
  font-size: 32rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: rgba(0,9,28,0.8500);
}
</style>
