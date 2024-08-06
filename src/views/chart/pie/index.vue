<template>
  <div class="pie-wrapper">
    <PieChart :chartOption="chartOption" style="width: 100%; height: 100%;"/>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import PieChart from "@/components/Chart/pie.vue";

const chartOption = reactive({
  subtext: "总人数",
  name: "用户分布",
  text: "4000人",
  data: [
    {
      value: 1770,
      name: "北京",
    },
    {
      value: 670,
      name: "上海",
    },
    {
      value: 500,
      name: "广州",
    },
    {
      value: 600,
      name: "深圳",
    },
    {
      value: 400,
      name: "天津",
    },
    {
      value: 500,
      name: "西安",
    },
    {
      value: 300,
      name: "杭州",
    },
    {
      value: 200,
      name: "苏州",
    },
    {
      value: 100,
      name: "郑州",
    },
  ],
});
</script>

<style lang="scss" scoped>
.pie-wrapper {
  height: 100%;
  background-color: #fff;
}
</style>
