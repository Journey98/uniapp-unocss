<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    width?: string
    type?: 'info' | 'primary' | 'minor'
    customStyle?: Record<string, string>
    size?: 'default' | 'medium' | 'small'
  }>(),
  { width: 'auto', type: 'primary', size: 'default' },
)
const emits = defineEmits<{ (event: 'click'): void }>()
const mergeStyle = computed(() => {
  return {
    width: props.width,
    ...props.customStyle,
  }
})
</script>

<template>
  <button class="rounded-20 btn-reset" :class="[`hex-btn-${props.type}`, `hex-size-${props.size}`]" :style="mergeStyle" @click="emits('click')">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.btn-reset {
  &::after {
    border: none;
  }
}

.hex-size-mini {
  @apply text-24px h-48px leading-48rpx;
}

.hex-size-medium {
  @apply text-28rpx h-64rpx leading-64rpx;
}

.hex-size-default {
  @apply text-32rpx h-96rpx leading-96rpx;
}

.hex-btn-info {
  @apply text-[#1C1C1D] bg-[rgba(28, 28, 29, 0.04)];

  &:active {
    background: $hex-type-info-dark;
  }
}

.hex-btn-primary {
  color: #ffffff;
  border-color: $hex-type-primary;
  background-color: $hex-type-primary;

  &:active {
    background: $hex-type-primary-dark;
  }
}
</style>
