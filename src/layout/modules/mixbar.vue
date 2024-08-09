<template>
  <div class="mixbar-layout">
    <div class="mixbar-header" :class="[hasShowHeaderBar ? 'hide-header' : '']">
      <!-- 左侧logo -->
      <Logo v-if="settingStore.showHeaderLogo" />
      <!-- 中间菜单 -->
      <Topbar v-if="settingStore.layout == 'mixbar'" />
      <!-- 右侧区域 -->
      <Rightbar />
    </div>
    <div class="mixbar-content" :class="classObjName">
      <Sidebar
        :showHeaderBar="settingStore.showHeaderBar"
      />
      <div class="content-rightbar">
        <div class="nav-bar">
          <!-- 面包屑 -->
          <Breadcrumb
            v-if="!hasHideBreadcrumb"
            :showHeaderBar="settingStore.showHeaderBar"
          />
          <!-- tagsview -->
          <Tagsview v-if="!hasHideTagsView" />
        </div>
        <!-- 二级路由占位区域 -->
        <div class="view-layout">
          <router-view v-slot="{ Component, route }">
            <transition appear name="fade-transform" mode="out-in">
              <keep-alive>
                <component :is="Component" :key="route.fullPath" />
              </keep-alive>
            </transition>
          </router-view>
        </div>
        <Tipfooter v-if="!hasShowFooterBar" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import Logo from "../components/logo.vue";
import Topbar from "../components/topbar.vue";
import Rightbar from "../components/rightbar.vue";
import Breadcrumb from "../components/breadcrumb.vue";
import Tagsview from "../components/tagsview.vue";
import Tipfooter from "../components/footer.vue";
import Sidebar from "../components/sidebar.vue";

import { computed } from "vue";
import useSettingStore from "@/store/modules/settingStore";
import useAppStore from "@/store/modules/appStore";

const appStore = useAppStore();
const settingStore = useSettingStore();
const currentRoute = useRoute();

const hasCollapseMenu = computed(() => {
  return !settingStore.showHeaderBar
    ? appStore.isCollapsed
    : appStore.isCollapsed || currentRoute.name == "cockpit";
});

const hasHideBreadcrumb = computed(() => {
  return settingStore.showHeaderBar
    ? !settingStore.showBreadcrumb || currentRoute.name == "cockpit"
    : false;
});

const hasHideTagsView = computed(() => {
  return settingStore.showHeaderBar
    ? !settingStore.showTagsView || currentRoute.name == "cockpit"
    : !settingStore.showTagsView;
});

const hasShowFooterBar = computed(() => {
  return !settingStore.showFooterBar || currentRoute.name == "cockpit";
});

const hasShowHeaderBar = computed(() => {
  return !settingStore.showHeaderBar;
});

const hideSidebar = computed(() => {
  return (
    currentRoute.path === "/home/cockpit" || settingStore.layout === "topbar"
  );
});

const classObjName = computed({
  get() {
    return {
      "collapse-menu": !hideSidebar.value && hasCollapseMenu.value,
      "hide-breadcrumb": hasHideBreadcrumb.value,
      "hide-tagsView": hasHideTagsView.value,
      "hide-header": hasShowHeaderBar.value,
      "hide-sidebar": hideSidebar.value,
      "no-padding-bottom": hasShowFooterBar.value,
    };
  },
  set() {
    appStore.updateCollapseMenu();
  },
});
</script>

<style lang="scss">
.mixbar-layout {
  width: 100%;
  height: 100%;

  /* 顶部区域 */
  .mixbar-header {
    width: 100%;
    color: #fff;
    height: $base-top-menu-height;
    background-color: $base-top-menu-background;
    display: flex;
    text-align: center;
    line-height: $base-top-menu-height;
    padding: 0 10px;

    &.hide-header {
      display: none;
    }
  }

  /* 底部区域 */
  .mixbar-content {
    width: 100%;
    height: calc(100% - $base-top-menu-height);
    display: flex;
    overflow: hidden;

    /* 侧边栏菜单 */
    .content-aside {
      width: $base-sidebar-menu-width;
      background-color: $base-sidebar-menu-background;
      height: 100%;
      transition: width 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);

      .sidebar-menu {
        border-right: 0;

        .el-menu-item {
          height: $menu-item-height;

          &.is-active {
            background-color: var(--el-color-primary);
          }
        }
      }
    }

    /* 右侧视图区域 */
    .content-rightbar {
      width: calc(100% - $base-sidebar-menu-width);
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .nav-bar {
        box-sizing: border-box;
        background-color: #fff;
      }

      .view-layout {
        box-sizing: border-box;
        height: 100%;
        padding: 6px;
        overflow-y: auto;
        overflow-x: hidden;
      }

      .content-rightbar-footer {
        box-sizing: border-box;
        background-color: #fff;
        font-size: 14px;
        color: #555;
        height: 28px;
        line-height: 28px;
        text-align: center;
        border-top: 1px solid #e4e7ed;
      }
    }

    /* 收缩菜单状态下 */
    &.collapse-menu {
      .content-aside {
        width: $base-collapse-sidebar-menu-width;
        border-right: 0;

        .sidebar-menu {
          width: 100%;

          .el-menu-item {
            padding: 0;

            .el-menu-tooltip__trigger {
              padding: 0;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
      }

      .content-rightbar {
        width: calc(100% - $base-collapse-sidebar-menu-width);
      }
    }

    &.hide-sidebar {
      .content-aside {
        width: 0;
      }

      .content-rightbar {
        width: 100%;
        margin-left: 0;

        .nav-bar {
          width: 100%;
          left: 0;
        }

        .content-rightbar-footer {
          width: 100%;
          left: 0;
        }
      }
    }

    /* 顶部隐藏状态下 */
    &.hide-header {
      padding-top: $base-breadcrumb-height + $base-tagsView-height;

      &.hide-breadcrumb {
        padding-top: $base-tagsView-height;

        &.hide-tagsView {
          padding-top: 0;
        }
      }

      &.hide-tagsView {
        padding-top: $base-breadcrumb-height;

        &.hide-breadcrumb {
          padding-top: 0;
        }
      }

      &.collapse-menu {
        .content-aside {
          width: 0;
          border-right: 0;
        }

        .content-rightbar {
          width: 100%;
          margin-left: 0;

          .nav-bar {
            width: 100%;
            left: 0;
          }

          .content-rightbar-footer {
            width: 100%;
            left: 0;
          }
        }
      }

      .content-aside {
        width: $base-sidebar-menu-width;
        height: 100%;
        top: 0px;
      }

      .content-rightbar {
        width: calc(100% - $base-sidebar-menu-width);
        margin-left: $base-sidebar-menu-width;

        .nav-bar {
          width: calc(100% - $base-sidebar-menu-width);
          left: $base-sidebar-menu-width;
          top: 0;
        }
      }
    }

    &.no-padding-bottom {
      height: calc(100% - $base-top-menu-height);
    }
  }
}
</style>
