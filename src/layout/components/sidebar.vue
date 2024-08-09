<template>
  <div class="content-aside">
    <el-scrollbar>
      <!-- 侧边栏菜单 -->
      <el-menu mode="vertical" :collapse-transition="false" :default-active="defaultActive" class="sidebar-menu"
        :collapse="appStore.isCollapsed" :background-color="menuConfig.baseSidebarMenuBackground"
        :text-color="menuConfig.baseSidebarMenuTextColor" :active-text-color="menuConfig.baseSidebarMenuActiveTextColor"
        unique-opened>
        <sidebar-item v-for="menu in menuList" :key="menu.path" :item="menu" :base-path="menu.path"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import useUserStore from "@/store/modules/userStore";
import config from "@/styles/config.module.scss";
import SidebarItem from "./sidebar-item-icon.vue";
import useAppStore from "@/store/modules/appStore";


const appStore = useAppStore();
const currentRoute = useRoute();

const userStore = useUserStore();

const menuConfig = ref({
  baseSidebarMenuBackground: config.baseSidebarMenuBackground,
  baseSidebarMenuTextColor: config.baseSidebarMenuTextColor,
  baseSidebarMenuActiveTextColor: config.baseSidebarMenuActiveTextColor,
});

const menuList = computed(() => {
  return props.showHeaderBar
    ? userStore.sidebarMenuList
    : userStore.authMenuList;
});

const defaultActive = computed(() => {
  const str: any = props.showHeaderBar ? currentRoute.name : currentRoute.path;
  return str;
});

const props = defineProps(["showHeaderBar"]);
</script>

<style lang="scss" scoped>
:deep(.el-scrollbar__wrap) {
  width: 100% !important;
  height: calc(100vh - $base-top-menu-height) !important;
}
</style>
