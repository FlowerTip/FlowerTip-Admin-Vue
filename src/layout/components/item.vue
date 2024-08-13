<template #title><svg-icon v-if="icon" :name="icon" :size="size" />{{ title }}</template>

<script lang="ts">
export default {
  name: "MenuItem",
};
</script>

<script lang="ts" setup>
defineProps({
  icon: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  size: {
    type: Number,
    default: 14,
  }
});
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
