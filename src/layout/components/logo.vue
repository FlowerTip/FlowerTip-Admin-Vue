<template>
  <div class="header-logo hidden-md-and-down">{{ defaultSetting.title }}</div>
</template>

<script lang="ts" setup>
import defaultSetting from "@/setting";
</script>

<style lang="scss" scoped>
.header-logo {
  // width: 190px;
  height: 100%;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #ffffff;
  // letter-spacing: 0.5px;
  margin-right: 20px;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
