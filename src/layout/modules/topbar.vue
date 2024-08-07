<template>
  <div class="layout">
    <div class="mixbar-header" :class="[hasShowHeaderBar ? 'hide-header' : '']">
      <!-- 左侧logo -->
      <Logo v-if="settingStore.showHeaderLogo" />
      <!-- 中间菜单 -->
      <TopMenu />
      <!-- 右侧区域 -->
      <Rightbar />
    </div>
    <div class="mixbar-content" :class="classObjName">
      <Sidebar
        :isCollapse="hasCollapseMenu"
        :showHeaderBar="settingStore.showHeaderBar"
      />
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
          <router-view v-slot="{ Component }">
            <transition name="fade">
              <component :is="Component" />
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
      "collapse-menu": hasCollapseMenu.value,
      "hide-breadcrumb": hasHideBreadcrumb.value,
      "hide-tagsView": hasHideTagsView.value,
      "hide-header": hasShowHeaderBar.value,
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
.layout {
  width: 100%;
  height: 100%;

  /* 顶部区域 */
  .mixbar-header {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
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
    height: 100%;
    padding-top: $base-top-menu-height + $base-breadcrumb-height +
      $base-tagsView-height;

    /* 侧边栏菜单 */
    .content-aside {
      width: $base-sidebar-menu-width;
      background-color: $base-sidebar-menu-background;
      height: calc(100% - $base-top-menu-height);

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
      width: 100%;
      height: calc(100% - $base-footer-bar-height);
      margin-left: 0;
      transition: margin-left 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      .nav-bar {
        width: 100%;
        background-color: #fff;
        position: fixed;
        left: 0;
        top: $base-top-menu-height;
        z-index: 999;
      }

      .view-layout {
        box-sizing: border-box;
        height: 100%;
        padding: 6px;
      }

      .content-rightbar-footer {
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 999;
        background-color: #fff;
        font-size: 14px;
        color: #555;
        height: 28px;
        line-height: 28px;
        text-align: center;
        border-top: 1px solid #e4e7ed;
      }

      /* 隐藏底部高度设置为100% */
      &.no-padding-bottom {
        height: 100%;
      }
    }

    /* 收缩菜单状态下 */
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

    /* 面包屑隐藏状态下 */
    &.hide-breadcrumb {
      padding-top: $base-top-menu-height + $base-tagsView-height;

      &.hide-tagsView {
        padding-top: $base-top-menu-height;
      }
    }

    /* 标签栏隐藏状态下 */
    &.hide-tagsView {
      padding-top: $base-top-menu-height + $base-breadcrumb-height;

      &.hide-breadcrumb {
        padding-top: $base-top-menu-height;
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

// .layout {
//   width: 100%;
//   height: 100%;

//   .mixbar-header {
//     width: 100%;
//     position: fixed;
//     left: 0;
//     top: 0;
//     z-index: 999;
//     color: #fff;
//     height: $base-top-menu-height;
//     background-color: #282e38;
//     display: flex;
//     text-align: center;
//     line-height: $base-top-menu-height;
//     padding: 0 10px;
//   }

//   .mixbar-content {
//     height: 100%;
//     padding-top: $base-top-menu-height + $base-breadcrumb-height +
//       $base-tagsView-height;

//     &.hide-breadcrumb {
//       padding-top: $base-top-menu-height + $base-tagsView-height;

//       &.hide-tagsView {
//         padding-top: $base-top-menu-height;
//       }
//     }

//     &.hide-tagsView {
//       padding-top: $base-top-menu-height + $base-breadcrumb-height;

//       &.hide-breadcrumb {
//         padding-top: $base-top-menu-height;
//       }
//     }

//     &.collapse-menu {
//       .content-aside {
//         width: 0px;
//         border-right: 0px;
//       }

//       .content-rightbar {
//         margin-left: 0px;
//         width: calc(100% - 0px);

//         .nav-bar {
//           width: calc(100% - 0px);
//           left: 0px;
//         }

//         .content-rightbar-footer {
//           left: 0px;
//         }
//       }
//     }

//     .content-rightbar {
//       margin-left: $base-sidebar-menu-width;
//       width: calc(100% - $base-sidebar-menu-width);
//       height: calc(
//         100vh - $base-breadcrumb-height - $base-tagsView-height -
//           $base-top-menu-height
//       );
//       padding-bottom: $base-footer-bar-height;
//       display: flex;
//       flex-direction: column;
//       transition: margin-left 0.28s;

//       &.no-padding-bottom {
//         padding-bottom: 0;
//         min-height: calc(
//           100vh - $base-breadcrumb-height - $base-tagsView-height -
//             $base-top-menu-height
//         );

//         &.hide-breadcrumb {
//           min-height: calc(
//             100vh - $base-tagsView-height - $base-top-menu-height
//           );

//           &.hide-tagsView {
//             min-height: calc(100vh - $base-top-menu-height);
//           }
//         }

//         &.hide-tagsView {
//           min-height: calc(
//             100vh - $base-top-menu-height - $base-breadcrumb-height
//           );

//           &.hide-breadcrumb {
//             min-height: calc(100vh - $base-top-menu-height);
//           }
//         }
//       }

//       &.hide-breadcrumb {
//         min-height: calc(100vh - $base-tagsView-height - $base-top-menu-height);

//         &.hide-tagsView {
//           min-height: calc(100vh - $base-top-menu-height);

//           &.no-padding-bottom {
//             min-height: calc(100vh - $base-top-menu-height);
//           }
//         }

//         &.no-padding-bottom {
//           padding-bottom: 0;
//           min-height: calc(
//             100vh - $base-top-menu-height - $base-tagsView-height
//           );

//           &.hide-tagsView {
//             min-height: calc(100vh - $base-top-menu-height);
//           }
//         }
//       }

//       &.hide-tagsView {
//         min-height: calc(
//           100vh - $base-top-menu-height - $base-breadcrumb-height
//         );

//         &.hide-breadcrumb {
//           min-height: calc(100vh - $base-top-menu-height);

//           &.no-padding-bottom {
//             padding-bottom: 0;
//             min-height: calc(100vh - $base-top-menu-height);
//           }
//         }

//         &.no-padding-bottom {
//           padding-bottom: 0;
//           min-height: calc(
//             100vh - $base-top-menu-height - $base-breadcrumb-height
//           );

//           &.hide-breadcrumb {
//             min-height: calc(100vh - $base-top-menu-height);
//           }
//         }
//       }

//       .nav-bar {
//         width: calc(100% - $base-sidebar-menu-width);
//         background-color: #fff;
//         position: fixed;
//         left: $base-sidebar-menu-width;
//         top: $base-top-menu-height;
//         z-index: 999;
//       }

//       .view-layout {
//         padding: 6px;
//         flex: 1;
//         display: flex;
//         flex-direction: column;
//       }
//     }
//   }
// }
</style>
