<template>
  <component :is="layoutComponents[com]"></component>
</template>

<script lang="ts" setup>
import mixbar from "./modules/mixbar.vue";
import topbar from "./modules/topbar.vue";
import sidebar from "./modules/sidebar.vue";
import simplebar from "./modules/simplebar.vue";
import useSettingStore from "@/store/modules/settingStore";
import defaultSetting from '@/setting'
import { computed } from "vue";
import { LayoutComponent } from "@/types";

const settingStore = useSettingStore();
const layoutComponents: LayoutComponent = {
  mixbar,
  topbar,
  sidebar,
  simplebar,
};
const com = computed(() => {
  return settingStore.layout || defaultSetting.layout;
});
</script>
