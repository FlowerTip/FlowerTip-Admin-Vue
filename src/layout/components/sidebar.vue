<template>
  <div class="content-aside" v-if="showSide">
    <!-- 侧边栏菜单 :collapse="isCollapse"-->
    <el-menu
      :default-active="defaultActive"
      class="sidebar-menu"
      :collapse="isCollapse"
      :collapse-transition="false"
      :background-color="menuConfig.baseSidebarMenuBackground"
      :text-color="menuConfig.baseSidebarMenuTextColor"
      :active-text-color="menuConfig.baseSidebarMenuActiveTextColor"
      unique-opened
    >
      <sidebar-item
        v-for="menu in menuList"
        :key="menu.path"
        :item="menu"
        :base-path="menu.path"
      ></sidebar-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import useUserStore from "@/store/modules/userStore";
import config from "@/styles/config.module.scss";
import SidebarItem from "./sidebar-item-icon.vue";
import useSettingStore from "@/store/modules/settingStore";

const settingStore = useSettingStore();
const currentRoute = useRoute();
console.log(currentRoute.name, "currentRoute");

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

const showSide = computed(() => {
  return props.showHeaderBar
    ? !(props.isCollapse || currentRoute.name === "home") &&
        settingStore.layout !== "topbar"
    : !props.isCollapse;
});

const props = defineProps(["isCollapse", "showHeaderBar"]);
</script>

<style lang="scss" scoped>
// .content-aside {
//   width: $base-sidebar-menu-width;
//   // position: fixed;
//   // left: 0;
//   // top: $base-top-menu-height;
//   background-color: $base-sidebar-menu-background;
//   height: calc(100% - $base-top-menu-height);
//   // transition: width 0.3s;

//   .sidebar-menu {
//     border-right: 0px;

//     .el-menu-item {
//       height: $menu-item-height;
//       &.is-active {
//         background-color: var(--el-color-primary);
//       }
//     }
//   }
// }
</style>
