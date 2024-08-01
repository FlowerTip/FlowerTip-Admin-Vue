<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import useThemeColor from "@/hooks/useThemeColor";
import defaultSetting from "@/setting";

onMounted(() => {
  const { toggleThemeColor } = useThemeColor();
  toggleThemeColor(defaultSetting.themeName);
});
</script>

<style scoped></style>
