<template>
  <div ref="chartRef" :style="{ height: height + 'px' }" class="chart-container"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

const props = defineProps<{
  data: number[]
  height: number
}>()

const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

const initChart = () => {
  if (!chartRef.value) return
  
  chart = echarts.init(chartRef.value)
  const option: EChartsOption = {
    grid: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      show: false
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series: [{
      data: props.data,
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 2,
      lineStyle: {
        width: 1,
        color: '#E6A23C'
      },
      itemStyle: {
        color: '#E6A23C',
        borderWidth: 1
      }
    }]
  }
  chart.setOption(option)
}

watch(() => props.data, () => {
  chart?.setOption({
    series: [{ data: props.data }]
  })
}, { deep: true })

onMounted(() => {
  initChart()
  window.addEventListener('resize', () => chart?.resize())
})

onUnmounted(() => {
  chart?.dispose()
  window.removeEventListener('resize', () => chart?.resize())
})
</script>

<style scoped>
.chart-container {
  width: 100%;
}
</style>