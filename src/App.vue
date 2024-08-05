<template>
  <ElConfigProvider :size="size">
    <div class="app-container">
      <router-view></router-view>
    </div>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import { ref, onMounted } from "vue";
import useThemeColor from "@/hooks/useThemeColor";
import defaultSetting from "@/setting";

const size = ref<GolabalSetting.SizeType>("default");

onMounted(() => {
  const { toggleThemeColor } = useThemeColor();
  toggleThemeColor(defaultSetting.themeName);
});
</script>

<style scoped></style>
