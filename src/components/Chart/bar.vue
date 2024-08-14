<template>
  <div ref="BarChart" style="width: 100%; height: 294px"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { ref, onMounted, onBeforeMount } from "vue";
import { useDebounceFn } from "@vueuse/core";

const props = defineProps({
  chartOption: {
    type: Object,
    default: () => ({}),
  },
});

const xAxisData = props.chartOption.xAxisData;
const unit = props.chartOption.unit;
const data = props.chartOption.data;

const BarChart = ref<HTMLDivElement | null>(null);

let myChart: echarts.ECharts;

let sidebarMenuNode: HTMLDivElement;

const option = {
  tooltip: {
    trigger: "item",
    formatter: "{b}：{c}人",
  },
  xAxis: {
    type: "category",
    data: xAxisData || [],
  },
  yAxis: {
    name: unit ? `单位(${unit})` : "",
    type: "value",
  },
  series: [
    {
      type: "bar",
      showBackground: true,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)",
      },
      label: {
        show: false,
        position: "center",
      },
      labelLine: {
        show: false,
      },
      data: data || [],
    },
  ],
};

onMounted(() => {
  myChart = echarts.init(BarChart.value);
  myChart.setOption(option);
  window.addEventListener("resize", resizeChart);
  sidebarMenuNode = document.getElementsByClassName(
    "content-aside"
  )[0] as HTMLDivElement;
  sidebarMenuNode &&
    sidebarMenuNode.addEventListener("transitionend", resizeChart);
});

onBeforeMount(() => {
  window.removeEventListener("resize", resizeChart);
  sidebarMenuNode &&
    sidebarMenuNode.removeEventListener("transitionend", resizeChart);
});

const resizeChart = useDebounceFn(() => {
  myChart.resize();
}, 100);
</script>

<style lang="scss" scoped></style>
