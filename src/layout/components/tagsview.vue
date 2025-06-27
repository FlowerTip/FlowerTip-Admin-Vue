<template>
  <div class="tab-box">
    <el-tabs type="card" :closable="showClose" v-model="tabsMenuValue" class="tabsview" @tab-remove="removeTab"
      @tab-click="tabClick">
      <el-tab-pane v-for="item in tagsViewStore.tabsMenuList" :key="item.path" :name="item.path as string">
        <template #label>
          <span class="custom-tabs-label">
            <svg-icon v-if="item.icon" :name="item.icon"></svg-icon>
            <span class="tag-title">{{ item.title }}</span>
          </span>
        </template>
      </el-tab-pane>
    </el-tabs>
    <el-dropdown placement="bottom" @command="handleCommand">
      <span class="el-dropdown-link">
        更多操作
        <el-icon>
          <ArrowDown />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <!-- 页面操作 -->
          <el-dropdown-item command="fullscreen"><el-icon>
              <FullScreen />
            </el-icon>最大化</el-dropdown-item>
          <el-dropdown-item command="refresh"><el-icon>
              <Refresh />
            </el-icon>刷新页面</el-dropdown-item>
          <!-- tab操作 -->
          <el-dropdown-item command="closeCurrent" divided><el-icon>
              <Remove />
            </el-icon>关闭当前</el-dropdown-item>
          <el-dropdown-item command="closeLeft"><el-icon>
              <DArrowLeft />
            </el-icon>关门左侧</el-dropdown-item>
          <el-dropdown-item command="closeRight"><el-icon>
              <DArrowRight />
            </el-icon>关闭右侧</el-dropdown-item>
          <!-- 批量tab操作 -->
          <el-dropdown-item command="closeOther" divided><el-icon>
              <CircleClose />
            </el-icon>关闭其他</el-dropdown-item>
          <el-dropdown-item command="closeAll"><el-icon>
              <FolderDelete />
            </el-icon>关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { computed, ref, watch, onMounted } from "vue";
import { useFullscreen } from '@vueuse/core';

import {
  ArrowDown,
  Refresh,
  Remove,
  DArrowLeft,
  DArrowRight,
  CircleClose,
  FolderDelete,
  FullScreen
} from "@element-plus/icons-vue";
import { TabPaneName, TabsPaneContext } from "element-plus";
import useUserStore from "@/store/modules/userStore";
import useTagsViewStore from "@/store/modules/tagsViewStore";

const { enter } = useFullscreen(document.getElementById('layout') as HTMLDivElement);

const userStore = useUserStore();
const tagsViewStore = useTagsViewStore();
const router = useRouter();
const showClose = computed(() => tagsViewStore.tabsMenuList.length !== 1);

const currRoute = useRoute();

const handleCommand = (command: string) => {
  switch (command) {
    case "fullscreen":
      enter();
      break;
    case "refresh":
      router.go(0);
      break;
    case "closeAll":
      closeAllTab();
      break;
    case "closeCurrent":
      closeCurrent();
      break;
    case "closeLeft":
      closeLeft();
      break;
    case "closeRight":
      closeRight();
      break;
    case "closeOther":
      closeOther();
      break;
    default:
      console.log("默认操作");
  }
};

const tabsMenuValue = ref(currRoute.fullPath);
// 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
watch(
  () => currRoute.fullPath,
  () => {
    tabsMenuValue.value = currRoute.fullPath;
    const tabsParams = {
      icon: currRoute.meta.icon as string,
      title: currRoute.meta.title as string,
      path: currRoute.fullPath,
      name: currRoute.name as string,
      close: !currRoute.meta.isAffix,
      isKeepAlive: currRoute.meta.isKeepAlive as boolean,
    };
    tagsViewStore.addTab(tabsParams);
  },
  { immediate: true }
);

onMounted(() => {
  initTabs();
});

// 初始化需要固定的 tabs
const initTabs = () => {
  userStore.flatMenuList.forEach((item) => {
    if (item.meta?.isAffix && !item.meta.isHide && !item.meta.isFull) {
      const tabsParams = {
        icon: item.meta.icon as string,
        title: item.meta.title as string,
        path: item.path as string,
        name: item.name as string,
        close: !item.meta.isAffix as boolean,
        isKeepAlive: item.meta.isKeepAlive as boolean,
      };
      tagsViewStore.addTab(tabsParams);
    }
  });
};

const removeTab = (targetName: TabPaneName) => {
  tagsViewStore.removeTab(
    targetName as string,
    targetName == currRoute.fullPath
  );
};

// 关闭所有菜单
const closeAllTab = () => {
  tagsViewStore.closeMultipleTab();
  router.push("/");
};

// 关闭当前菜单
const closeCurrent = () => {
  const current = tagsViewStore.tabsMenuList.find(
    (item) => item.name === currRoute.name
  );
  console.log(current, "ccurrent");
  current && tagsViewStore.removeTab(current.path as string, true);
};

// 关闭左侧菜单
const closeLeft = () => {
  const current = tagsViewStore.tabsMenuList.find(
    (item) => item.name === currRoute.name
  );
  current && tagsViewStore.closeTabsOnSide(current.path as string, "left");
};

// 关闭右侧菜单
const closeRight = () => {
  const current = tagsViewStore.tabsMenuList.find(
    (item) => item.name === currRoute.name
  );
  current && tagsViewStore.closeTabsOnSide(current.path as string, "right");
};

// 关闭其他菜单
const closeOther = () => {
  const current = tagsViewStore.tabsMenuList.find(
    (item) => item.name === currRoute.name
  );
  current && tagsViewStore.closeMultipleTab(current.path);
};

const tabClick = (tabItem: TabsPaneContext) => {
  const fullPath = tabItem.props.name as string;
  router.push(fullPath);
};
</script>

<style lang="scss" scoped>
.tab-box {
  height: 30px;
  padding-left: 4px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .tabsview {
    width: calc(100% - 100px);

    :deep(.el-tabs__nav) {
      border: 0px;
    }

    :deep(.el-tabs__header) {
      margin: 0;
      height: 26px;
      border-bottom: 0 !important;
    }

    :deep(.el-tabs__item) {
      height: 26px;
      border: 0px;
      padding: 0 14px !important;

      &.is-active {
        background-color: var(--el-color-primary);
        border-radius: 26px;
        color: #fff;
      }
    }

    :deep(.el-tabs__nav-prev) {
      height: 26px;
      line-height: 26px;
      border-right: 1px solid #dcdfe6;
    }

    :deep(.el-tabs__nav-next) {
      height: 26px;
      line-height: 26px;
      border-left: 1px solid #dcdfe6;
    }
  }

  .el-dropdown {
    width: 100px;
    height: 100%;
    border-left: 1px solid #dcdfe6;
    border-bottom: 1px solid #dcdfe6;
    border-right: 1px solid #dcdfe6;
    line-height: 26px;
    text-align: center;

    .el-dropdown-link {
      display: inline-block;
      width: 100%;
      cursor: pointer;
    }
  }
}

.el-icon--right {
  cursor: pointer;
}

/* 自定义tab标签标题 */
.custom-tabs-label {
  display: flex;
  align-items: center;

  .tag-title {
    padding-left: 4px;
  }
}
</style>
