<template>
  <ElConfigProvider :size="size" :button="btnConfig">
    <div class="app-container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import { ref, onMounted } from "vue";
import useThemeColor from "@/hooks/useThemeColor";
import defaultSetting from "@/setting";

const size = ref<GolabalSetting.SizeType>("default");
const btnConfig = ref({
  autoInsertSpace: false,
});

onMounted(() => {
  const { toggleThemeColor } = useThemeColor();
  toggleThemeColor(defaultSetting.themeName);
});
</script>

<style scoped></style>
