<template>
  <a v-if="isExternal" :href="to" target="_blank">
    <slot></slot>
  </a>
  <router-link v-else :to="to">
    <slot></slot>
  </router-link>
</template>

<script lang="ts">
export default {
  name: "AppLink",
};
</script>

<script lang="ts" setup>
import { computed } from "vue";
import { isExternalFn } from "@/utils/validate";

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
});

const isExternal = computed(() => {
  return isExternalFn(props.to);
});
</script>

<style lang="scss">
// .el-menu-item {
//   height: 50px;
//   line-height: 50px;
//   border-bottom: 2px solid transparent;
//   &.is-active {
//     border-color: $base-top-menu-active-text-color;
//   }
// }
// .el-sub-menu {
//   .el-sub-menu__title {
//     height: 50px;
//     line-height: 50px;
//   }
// }
// li {
//   height: 100%;
//   height: 50px;
//   line-height: 50px;
// }

// a {
//   height: 100%;
//   text-decoration: none;
//   height: 50px;
//   line-height: 50px;

//   li {
//     height: 50px !important;
//     line-height: 50px !important;
//   }
// }
</style>
