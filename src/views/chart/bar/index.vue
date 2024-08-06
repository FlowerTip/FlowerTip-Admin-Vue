<template>
  <div class="bar-wrapper">
    <BarChart :chartOption="chartOption" style="width: 100%; height: 100%" />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import BarChart from "@/components/Chart/bar.vue";

const chartOption = reactive({
  unit: "人",
  text: "用户人数",
  xAxisData: ["北京", "上海", "广州", "深圳", "杭州", "苏州", "西安", "郑州"],
  data: [120, 200, 150, 80, 70, 110, 130, 500],
});
</script>

<style lang="scss" scoped>
.bar-wrapper {
  height: 100%;
  background-color: #fff;
}
</style>
