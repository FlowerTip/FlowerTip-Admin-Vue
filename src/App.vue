<template>
  <ElConfigProvider :size="size" :button="btnConfig">
    <router-view></router-view>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import { ref, onMounted } from "vue";
import useThemeColor from "@/hooks/useThemeColor";
import defaultSetting from "@/setting";

type SizeType = "large" | "default" | "small";

const size = ref<SizeType>("default");
const btnConfig = ref({
  autoInsertSpace: false,
});

onMounted(() => {
  const { toggleThemeColor } = useThemeColor();
  toggleThemeColor(defaultSetting.themeName);
});
</script>

<style scoped></style>
