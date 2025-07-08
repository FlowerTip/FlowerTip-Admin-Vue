<template>
  <div ref="chartRef" class="chart-container" v-loading="loading"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";

const props = defineProps<{
  loading?: boolean;
  timeRange?: "week" | "month" | "year";
}>();

const chartRef = ref<HTMLElement>();
let chart: echarts.ECharts | null = null;

// 模拟数据
const generateData = () => {
  const data = [];
  const now = new Date();
  const days =
    props.timeRange === "week" ? 7 : props.timeRange === "month" ? 30 : 365;
  const step = props.timeRange === "year" ? 30 : 1; // 年度数据按月显示

  for (let i = 0; i < days; i += step) {
    const date = new Date(now.getTime() - (days - i) * 24 * 3600 * 1000);
    const dateStr =
      props.timeRange === "year"
        ? `${date.getFullYear()}/${date.getMonth() + 1}`
        : `${date.getMonth() + 1}/${date.getDate()}`;

    data.push({
      date: dateStr,
      sales: Math.floor(
        Math.random() * (props.timeRange === "year" ? 50000 : 1000) +
          (props.timeRange === "year" ? 10000 : 500)
      ),
      visits: Math.floor(
        Math.random() * (props.timeRange === "year" ? 100000 : 2000) +
          (props.timeRange === "year" ? 20000 : 1000)
      ),
    });
  }
  return data;
};

const initChart = () => {
  if (!chartRef.value) return;

  const data = generateData();
  chart = echarts.init(chartRef.value);
  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["销售额", "访问量"],
      top: 0,
      left: "center",
    },
    grid: {
      top: 50,
      right: 20,
      bottom: 20,
      left: 40,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: data.map((item) => item.date),
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: [
      {
        type: "value",
        name: "销售额",
        position: "left",
        axisLine: {
          show: true,
          lineStyle: {
            color: "#409EFF",
          },
        },
        axisLabel: {
          formatter: "{value} 元",
        },
      },
      {
        type: "value",
        name: "访问量",
        position: "right",
        axisLine: {
          show: true,
          lineStyle: {
            color: "#67C23A",
          },
        },
        axisLabel: {
          formatter: "{value} 次",
        },
      },
    ],
    series: [
      {
        name: "销售额",
        type: "bar",
        barWidth: "20%",
        data: data.map((item) => item.sales),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#409EFF" },
            { offset: 1, color: "#95d5ff" },
          ]),
        },
      },
      {
        name: "访问量",
        type: "line",
        yAxisIndex: 1,
        data: data.map((item) => item.visits),
        smooth: true,
        symbol: "circle",
        symbolSize: 8,
        lineStyle: {
          width: 2,
          color: "#67C23A",
        },
        itemStyle: {
          color: "#67C23A",
          borderWidth: 2,
          borderColor: "#fff",
        },
      },
    ],
    animation: true,
    animationDuration: 1000,
    animationEasing: "cubicInOut",
  };
  chart.setOption(option);
};

// 监听加载状态变化
watch(
  () => props.loading,
  (val) => {
    if (!val) {
      setTimeout(() => {
        initChart();
      }, 100);
    }
  }
);

// 监听时间范围变化
watch(
  () => props.timeRange,
  () => {
    if (!props.loading && chart) {
      const data = generateData();
      chart.setOption({
        xAxis: {
          data: data.map((item) => item.date),
        },
        series: [
          {
            data: data.map((item) => item.sales),
          },
          {
            data: data.map((item) => item.visits),
          },
        ],
      });
    }
  }
);

onMounted(() => {
  if (!props.loading) {
    initChart();
  }
  window.addEventListener("resize", () => chart?.resize());
});

onUnmounted(() => {
  chart?.dispose();
  window.removeEventListener("resize", () => chart?.resize());
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 380px;
}
</style>
