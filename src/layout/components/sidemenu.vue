<template>
  <div class="content-aside" v-if="!isCollapse">
    <!-- 侧边栏菜单 :collapse="isCollapse"-->
    <div v-if="settingStore.layout == 'simplebar'" class="sidebar-logo">
      <!-- <img src="/favicon.svg" alt="sidebar-logo" /> -->
      <span class="system-name">{{ defaultSetting.title }}</span>
    </div>
    <el-menu
      :default-active="currentRoute.path as string"
      class="sidebar-menu"
      :collapse="isCollapse"
      :background-color="menuConfig.baseSidebarMenuBackground"
      :text-color="menuConfig.baseSidebarMenuTextColor"
      :active-text-color="menuConfig.baseSidebarMenuActiveTextColor"
      unique-opened
    >
      <sidebar-item
        v-for="menu in userStore.authMenuList"
        :key="menu.path"
        :item="menu"
        :base-path="menu.path"
      ></sidebar-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import defaultSetting from "@/setting";
import useUserStore from "@/store/modules/userStore";
import useSettingStore from "@/store/modules/settingStore";
// import { Location } from "@element-plus/icons-vue";
import config from "@/styles/config.module.scss";
import SidebarItem from "./sidebar-item-icon.vue";

const currentRoute = useRoute();
console.log(currentRoute.name, "currentRoute");
const settingStore = useSettingStore();
const userStore = useUserStore();

const menuConfig = ref({
  baseSidebarMenuBackground: config.baseSidebarMenuBackground,
  baseSidebarMenuTextColor: config.baseSidebarMenuTextColor,
  baseSidebarMenuActiveTextColor: config.baseSidebarMenuActiveTextColor,
});

defineProps(["isCollapse"]);
</script>

<style lang="scss" scoped>
.sidebar-logo {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4) !important;
  box-sizing: border-box;
  img {
    height: 50%;
  }
  .system-name {
    color: #fff;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    font-size: 20px;
    font-weight: 700;
  }
}
</style>
