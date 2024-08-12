<template>
  <div class="header-menu">
    <el-menu
      mode="horizontal"
      class="top-menu"
      :default-active="currentRoute.path as string"
      :collapse-transition="false"
      :background-color="menuConfig.baseTopMenuBackground"
      :text-color="menuConfig.baseTopMenuTextColor"
      :active-text-color="settingStore.color"
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
import useUserStore from "@/store/modules/userStore";
import useSettingStore from "@/store/modules/settingStore";
import config from "@/styles/config.module.scss";
import SidebarItem from "./sidebar-item.vue";

const settingStore = useSettingStore();
const currentRoute = useRoute();
console.log(currentRoute.name, "currentRoute");

const userStore = useUserStore();

const menuConfig = ref({
  baseTopMenuBackground: config.baseTopMenuBackground,
  baseTopMenuTextColor: config.baseTopMenuTextColor,
  baseTopMenuActiveTextColor: config.baseTopMenuActiveTextColor,
});
</script>

<style lang="scss">
.header-menu {
  flex: 1;
  min-width: 100px;
  .top-menu {
    width: 100%;
    height: $base-top-menu-height !important;
    border: 0px !important;

    .el-menu-item,
    .el-sub-menu .el-sub-menu__title {
      box-sizing: border-box !important;
      font-size: 17px;
      height: $base-top-menu-height !important;
      line-height: $base-top-menu-height !important;
      &.is-active {
        border-bottom: 2px solid var(--el-color-primary) !important;
        color: var(--el-color-primary) !important;
      }
    }

    .el-sub-menu {
      box-sizing: border-box !important;
      &.is-active {
        .el-sub-menu__title {
          border-bottom: 2px solid var(--el-color-primary) !important;
          color: var(--el-color-primary) !important;
        }
      }
    }
  }
}
.el-menu--popup {
  .nest-menu {
    .el-menu-item {
      font-size: 15px;
    }
    .el-sub-menu {
      .el-sub-menu__title {
        font-size: 15px;
      }
    }
  }
}
</style>
