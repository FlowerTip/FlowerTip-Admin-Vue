<template>
  <div ref="MoreBarChart" style="width: 100%; height: 294px"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { ref, onMounted, onBeforeMount } from "vue";
import { useDebounceFn } from "@vueuse/core";
import useSettingStore from "@/store/modules/settingStore";
const settingStore = useSettingStore();
const props = defineProps({
  chartOption: {
    type: Object,
    default: () => ({}),
  },
});
const icon = props.chartOption.icon;
const orient = props.chartOption.orient;
const xAxisData = props.chartOption.xAxisData;
const legendData = props.chartOption.legendData;
const unit = props.chartOption.unit;
const seriesData = props.chartOption.seriesData;

const MoreBarChart = ref(null);

let myChart: echarts.ECharts;

let sidebarMenuNode: HTMLDivElement;

const option = {
  tooltip: {
    trigger: "item",
    formatter: "{a} {b}：{c}人",
  },
  legend: {
    top: "5%",
    left: orient === "vertical" ? 0 : "center",
    icon: icon || "circle",
    orient: orient || "horizontal", // vertical || horizontal
    type: "scroll",
    // pageIconColor: "#fff", // 翻页图标的字体颜色
    pageIconInactiveColor: settingStore.color, // 当前页的翻页图标高亮颜色
    // 分页数字样式设置
    pageTextStyle: {
      // color: "#fff",
    },
    data: legendData || [],
  },
  xAxis: {
    type: "category",
    data: xAxisData || [],
  },
  yAxis: {
    name: unit ? `单位(${unit})` : "",
    type: "value",
  },
  series: seriesData || [],
  // series: [
  //   {
  //     name: 'Email',
  //     type: 'line',
  //     stack: 'Total',
  //     smooth: true,
  //     data: data || []
  //   },
  // ],
};

onMounted(() => {
  myChart = echarts.init(MoreBarChart.value);
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
