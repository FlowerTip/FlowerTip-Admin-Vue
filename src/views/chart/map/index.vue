<template>
  <div class="chart-wrapper">
    <MapChart style="width: 100%; height: 100%" />
  </div>
</template>

<script lang="ts" setup>
import MapChart from "@/components/Chart/map.vue";
</script>

<style lang="scss" scoped>
.chart-wrapper {
  height: 100%;
  background-color: #fff;
}
</style>
