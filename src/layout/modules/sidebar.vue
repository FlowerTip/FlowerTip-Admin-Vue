<template>
  <div class="sidebar-layout">
    <div class="mixbar-header" :class="[hasShowHeaderBar ? 'hide-header' : '']">
      <!-- 左侧logo -->
      <Logo v-if="settingStore.showHeaderLogo" />
      <!-- 右侧区域 -->
      <Rightbar />
    </div>
    <div class="mixbar-content" :class="classObjName">
      <SideMenu />
      <div class="content-rightbar" :class="contentRightBarClassName">
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
import Logo from "../components/logo.vue";
import Rightbar from "../components/rightbar.vue";
import Breadcrumb from "../components/breadcrumb.vue";
import Tagsview from "../components/tagsview.vue";
import Tipfooter from "../components/footer.vue";
import SideMenu from "../components/sidemenu.vue";

import { computed } from "vue";
import { useRoute } from "vue-router";
import useSettingStore from "@/store/modules/settingStore";
import useAppStore from "@/store/modules/appStore";
const settingStore = useSettingStore();
const appStore = useAppStore();

const currentRoute = useRoute();

const hasHideBreadcrumb = computed(() => {
  return !settingStore.showBreadcrumb;
});

const hasHideTagsView = computed(() => {
  return !settingStore.showTagsView;
});

const hasShowFooterBar = computed(() => {
  return !settingStore.showFooterBar || currentRoute.name == "cockpit";
});

const hasShowHeaderBar = computed(() => {
  return !settingStore.showHeaderBar;
});

const classObjName = computed({
  get() {
    return {
      "collapse-menu": appStore.isCollapsed,
      "hide-breadcrumb": hasHideBreadcrumb.value,
      "hide-tagsView": hasHideTagsView.value,
      "hide-header": hasShowHeaderBar.value,
    };
  },
  set() {
    appStore.updateCollapseMenu();
  },
});

const contentRightBarClassName = computed(() => {
  return {
    "no-padding-bottom": hasShowFooterBar.value,
    "hide-breadcrumb": hasHideBreadcrumb.value,
    "hide-tagsView": hasHideTagsView.value,
  };
});
</script>

<style lang="scss">
.sidebar-layout {
  width: 100%;
  height: 100%;

  /* 顶部区域 */
  .mixbar-header {
    width: 100%;
    color: #fff;
    height: $base-top-menu-height;
    background-color: $base-top-menu-background;
    display: flex;
    justify-content: space-between;
    text-align: center;
    line-height: $base-top-menu-height;
    padding: 0 10px;

    &.hide-header {
      display: none;
    }
  }

  /* 底部区域 */
  .mixbar-content {
    height: calc(100% - $base-top-menu-height);
    display: flex;
    overflow: hidden;

    /* 侧边栏菜单 */
    .content-aside {
      width: $base-sidebar-menu-width;
      background-color: $base-sidebar-menu-background;
      transition: width 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);

      .sidebar-menu {
        border-right: 0px;

        .el-sub-menu {
          &.is-active {
            > .el-sub-menu__title {
              color: #fff;
            }

            .nest-menu {
              .el-sub-menu {
                &.is-active {
                  .el-sub-menu__title {
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .el-sub-menu__title {
          font-size: 15px;
          border-bottom: 1px solid $menu-item-border-color;
        }

        .el-menu-item {
          height: $base-top-menu-height;
          font-size: 15px;
          border-bottom: 1px solid $menu-item-border-color;

          &.is-active {
            background-color: var(--el-color-primary);
          }
        }
      }
    }

    /* 右侧视图区域 */
    .content-rightbar {
      display: flex;
      flex-direction: column;
      width: calc(100% - $base-sidebar-menu-width);

      .nav-bar {
        box-sizing: border-box;
        background-color: #fff;
      }

      .view-layout {
        box-sizing: border-box;
        padding: 6px;
        flex: 1;
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

          .el-sub-menu {
            .el-sub-menu__title {
              padding: 0;
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
  }
}
</style>
