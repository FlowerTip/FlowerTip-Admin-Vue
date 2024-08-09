<template>
  <component :is="layoutComponents[com]"></component>
</template>

<script lang="ts" setup>
import mixbar from "./modules/mixbar.vue";
import topbar from "./modules/topbar.vue";
import sidebar from "./modules/sidebar.vue";
import simplebar from "./modules/simplebar.vue";
import useSettingStore from "@/store/modules/settingStore";
import { computed } from "vue";

const settingStore = useSettingStore();
const layoutComponents: any = {
  mixbar,
  topbar,
  sidebar,
  simplebar,
};
const com = computed(() => {
  return settingStore.layout;
});
</script>
