<template>
  <div
    ref="chartRef"
    :style="{ height: height + 'px' }"
    class="chart-container"
  >
    <div class="progress-bar">
      <div
        class="progress-inner"
        :style="{
          width: percentage + '%',
          background: `linear-gradient(90deg, ${startColor} 0%, ${endColor} 100%)`,
        }"
      ></div>
    </div>
    <div class="progress-info">
      <span class="percentage">{{ percentage }}%</span>
      <span class="label">目标完成度</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    percentage: number;
    height: number;
    startColor?: string;
    endColor?: string;
  }>(),
  {
    startColor: "#409EFF",
    endColor: "#95d5ff",
  }
);
</script>

<style scoped>
.chart-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background-color: var(--el-fill-color-light);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-inner {
  height: 100%;
  transition: width 0.6s ease;
  border-radius: 3px;
}

.progress-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
}

.percentage {
  color: var(--el-text-color-primary);
  font-weight: 500;
}

.label {
  color: var(--el-text-color-secondary);
}
</style>
