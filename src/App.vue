<template>
  <ElConfigProvider :size="size" :button="btnConfig">
    <router-view></router-view>
  </ElConfigProvider>
</template>

<script setup lang="ts" name="App">
import { ref, onMounted } from "vue";
import { ElConfigProvider } from "element-plus";
import defaultSetting from "@/setting";
import useThemeColor from "@/hooks/useThemeColor";

const size = ref<AppTypeConfig.ElementPlusSizeType>("default");
const btnConfig = ref({
  autoInsertSpace: false,
});

onMounted(() => {
  const { toggleThemeColor } = useThemeColor();
  toggleThemeColor(defaultSetting.themeName);
});
</script>
