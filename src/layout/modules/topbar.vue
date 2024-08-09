<template>
  <div class="topbar-layout">
    <div class="mixbar-header" :class="[hasShowHeaderBar ? 'hide-header' : '']">
      <!-- 左侧logo -->
      <Logo v-if="settingStore.showHeaderLogo" />
      <!-- 中间菜单 -->
      <TopMenu />
      <!-- 右侧区域 -->
      <Rightbar />
    </div>
    <div class="mixbar-content" :class="classObjName">
      <Sidebar v-if="false" />
      <div class="content-rightbar" :class="contentRightBarClassName">
        <div class="nav-bar">
          <!-- 面包屑 -->
          <Breadcrumb
            v-if="!hasHideBreadcrumb"
            :isCollapse="hasCollapseMenu"
            :toggleCollapse="toggleCollapse"
            :showHeaderBar="settingStore.showHeaderBar"
          />
          <!-- tagsview -->
          <Tagsview v-if="!hasHideTagsView" />
        </div>
        <!-- 二级路由占位区域 -->
        <div class="view-layout">
          <router-view v-slot="{ Component, route }">
            <transition appear name="fade-transform" mode="out-in">
              <component :is="Component" :key="route.fullPath" />
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
import Sidebar from "../components/sidebar.vue";
import TopMenu from "../components/topmenu.vue";
import Rightbar from "../components/rightbar.vue";
import Breadcrumb from "../components/breadcrumb.vue";
import Tagsview from "../components/tagsview.vue";
import Tipfooter from "../components/footer.vue";

import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import useSettingStore from "@/store/modules/settingStore";
const settingStore = useSettingStore();
const isCollapse = ref(false);

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};

const currentRoute = useRoute();

const hasCollapseMenu = computed(() => {
  return !settingStore.showHeaderBar
    ? isCollapse.value
    : isCollapse.value || currentRoute.name == "cockpit";
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

const classObjName = computed({
  get() {
    return {
      "hide-breadcrumb": hasHideBreadcrumb.value,
      "hide-tagsView": hasHideTagsView.value,
      "hide-header": hasShowHeaderBar.value,
      "no-padding-bottom": hasShowFooterBar.value,
    };
  },
  set() {
    toggleCollapse();
  },
});

const contentRightBarClassName = computed(() => {
  if (settingStore.showHeaderBar) {
    return {
      "no-padding-bottom": hasShowFooterBar.value,
      "hide-breadcrumb": hasHideBreadcrumb.value,
      "hide-tagsView": hasHideTagsView.value,
    };
  } else {
    return {
      "no-padding-bottom": hasShowFooterBar.value,
    };
  }
});
</script>

<style lang="scss" scoped>
.topbar-layout {
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
      width: 0;
    }

    /* 右侧视图区域 */
    .content-rightbar {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .nav-bar {
        box-sizing: border-box;
        width: 100%;
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
        width: 100%;
        background-color: #fff;
        font-size: 14px;
        color: #555;
        height: 28px;
        line-height: 28px;
        text-align: center;
        border-top: 1px solid #e4e7ed;
      }
    }

    &.no-padding-bottom {
      height: calc(100% - $base-top-menu-height);
    }
  }
}
</style>
