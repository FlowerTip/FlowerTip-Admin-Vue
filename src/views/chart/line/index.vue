<template>
  <div class="chart-wrapper">
    <LineChart :chartOption="chartOption" style="width: 100%; height: 100%" />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import LineChart from "@/components/Chart/line.vue";

const chartOption = reactive({
  unit: "人",
  xAxisData: ["北京", "上海", "广州", "深圳", "杭州", "苏州", "西安", "郑州"],
  data: [120, 200, 150, 80, 70, 110, 130, 500],
});
</script>

<style lang="scss" scoped>
.chart-wrapper {
  height: 100%;
  background-color: #fff;
}
</style>
