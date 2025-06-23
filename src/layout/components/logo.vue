<template>
  <div
    class="header-logo"
    :class="{ 'hidden-md-and-down': settingStore.layout === 'mixbar' }"
  >
    {{ defaultSetting.title }}
  </div>
</template>

<script lang="ts" setup>
import defaultSetting from "@/setting";
import useSettingStore from "@/store/modules/settingStore";

const settingStore = useSettingStore();
</script>

<style lang="scss" scoped>
.header-logo {
  // width: 190px;
  height: 100%;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 600;
  font-size: 25px;
  color: #ffffff;
  margin-right: 15px;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
