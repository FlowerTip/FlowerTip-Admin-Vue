<template>
  <suspense>
    <template #default>
      <component :is="layoutComponents[com]"></component>
    </template>
    <template #fallback>
      <Loading />
    </template>
  </suspense>
</template>

<script lang="ts" setup>
import Loading from "@/components/Loading/index.vue";
import useSettingStore from "@/store/modules/settingStore";
import { computed, defineAsyncComponent } from "vue";

const settingStore = useSettingStore();
const layoutComponents: any = {
  mixbar: defineAsyncComponent(() => import("./modules/mixbar.vue")),
  topbar: defineAsyncComponent(() => import("./modules/topbar.vue")),
  sidebar: defineAsyncComponent(() => import("./modules/sidebar.vue")),
  simplebar: defineAsyncComponent(() => import("./modules/simplebar.vue")),
};
const com = computed(() => {
  return settingStore.layout;
});
</script>
