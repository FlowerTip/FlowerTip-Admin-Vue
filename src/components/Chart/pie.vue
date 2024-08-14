<template>
  <div :id="uuid" style="width: 100%; height: 294px"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, onBeforeMount } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { generateUUID } from "@/utils/tool";
import useSettingStore from "@/store/modules/settingStore";

const props = defineProps({
  chartOption: {
    type: Object,
    default: () => ({}),
  },
});

const settingStore = useSettingStore();
const uuid = generateUUID() + "PieChart";

let myChart: echarts.ECharts;
let sidebarMenuNode: HTMLDivElement;

const name = props.chartOption.name;
const text = props.chartOption.text;
const subtext = props.chartOption.subtext;
const orient = props.chartOption.orient;
const icon = props.chartOption.icon;
const data = props.chartOption.data;

const option = {
  title: {
    text: text ? text : "100%",
    left: "center",
    top: "42.5%",
    subtext: subtext || "",
  },
  tooltip: {
    trigger: "item",
    formatter: "{b}：{c}人",
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
  },
  series: [
    {
      name: name || "",
      type: "pie",
      radius: ["50%", "70%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center",
      },
      // emphasis: {
      //   label: {
      //     show: true,
      //     fontSize: 40,
      //     fontWeight: 'bold'
      //   }
      // },
      labelLine: {
        show: false,
      },
      data: data || [],
    },
  ],
};

onMounted(() => {
  myChart = echarts.init(document.getElementById(uuid));
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
