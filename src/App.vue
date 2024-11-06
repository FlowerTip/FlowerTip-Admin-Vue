<template>
  <ElConfigProvider :size="size" :button="btnConfig" :locale="lang">
    <router-view></router-view>
  </ElConfigProvider>
</template>

<script setup lang="ts" name="App">
import { ref, onMounted, computed } from "vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import en from "element-plus/dist/locale/en.mjs";
import defaultSetting from "@/setting";
import useThemeColor from "@/hooks/useThemeColor";

const lang = computed(() => {
  return navigator.language === "en" ? en : zhCn;
});

const size = ref<AppTypeConfig.ElementPlusSizeType>("default");
const btnConfig = ref({
  autoInsertSpace: false,
});

onMounted(() => {
  const { toggleThemeColor } = useThemeColor();
  toggleThemeColor(defaultSetting.themeName);
});
</script>
