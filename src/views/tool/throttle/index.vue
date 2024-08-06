<template>
  <div class="event-wrapper">
    <div>
      <el-button type="default" @click="throttleFn">函数防抖</el-button>
      <el-button type="default" @click="debounceFn">函数节流</el-button>
    </div>
    <div class="result">
      <p>函数防抖执行的次数：{{ debounceCount }}</p>
      <p>函数节流执行的次数：{{ throttleCount }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useThrottleFn, useDebounceFn } from '@vueuse/core';

const throttleCount = ref(0);
const debounceCount = ref(0);

const throttleFn = useThrottleFn(() => {
  console.log('@@@@useThrottleFn');
  throttleCount.value++;
}, 1000)

const debounceFn = useDebounceFn(() => {
  console.log('@@@@useDebounceFn');
  debounceCount.value++;
}, 1000)
</script>

<style lang="scss" scoped>
.event-wrapper {
  height: 100%;
  padding: 20px;
  background-color: #fff;
  .result {
    margin-top: 20px;
    padding-left: 20px;
  }
  p {
    line-height: 40px;
    font-size: 14px;
  }
}
</style>
