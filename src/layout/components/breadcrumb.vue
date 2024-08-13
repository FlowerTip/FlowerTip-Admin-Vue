<template>
  <div class="breadcrumb">
    <div class="left-wrapper">
      <span
        v-if="showToggleCollapse"
        class="toggle-btn"
        @click="toggleCollapse"
      >
        <el-icon size="20px">
          <Fold v-show="!appStore.isCollapsed" />
          <Expand v-show="appStore.isCollapsed" />
        </el-icon>
      </span>
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item
          v-for="route in matched"
          :key="route.path"
          :to="{ name: route.name }"
          class="breadcrumb-item"
        >
          <svg-icon v-if="route.meta.icon" :name="route.meta.icon"></svg-icon>
          <span>{{ route.meta.title }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div v-if="!showHeaderBar" class="right-wrapper">
      <Rightbar />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Rightbar from "../components/rightbar.vue";
import useUserStore from "@/store/modules/userStore";
import useSettingStore from "@/store/modules/settingStore";
import useAppStore from "@/store/modules/appStore";
import { Fold, Expand, ArrowRight } from "@element-plus/icons-vue";

const settingStore = useSettingStore();
const userStore = useUserStore();
const appStore = useAppStore();

const showToggleCollapse = computed(() => {
  return (
    (settingStore.layout !== "topbar" || !settingStore.showHeaderBar) &&
    !settingStore.topShowCollapsed
  );
});

const route = useRoute();

console.log(route.matched);

const matched = computed(() => {
  const firstAuthMenu = userStore.authMenuList[0];
  let firstEle = {
    ...firstAuthMenu,
    meta: {
      title: firstAuthMenu.meta?.title ?? "驾驶舱",
      icon: firstAuthMenu.meta?.icon ?? "ele-Stopwatch",
    },
  };
  const firstMatched = route.matched[0];
  if (firstMatched.path == "/" || firstMatched.path == "/home") {
    return [{ ...firstEle }];
  } else {
    return [...route.matched];
  }
});

defineProps(["showHeaderBar"]);

const toggleCollapse = () => {
  appStore.updateCollapseMenu();
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  border-bottom: 1px solid #e4e7ed;
  padding: 0 10px;

  .left-wrapper {
    display: flex;
    align-items: center;
  }

  .toggle-btn {
    cursor: pointer;
    padding-right: 10px;

    .el-icon {
      height: 40px;
      line-height: 40px;
    }
  }

  .breadcrumb-item {
    :deep(.el-breadcrumb__inner) {
      display: flex;
      align-items: center;

      span {
        margin-left: 4px;
      }
    }
  }
}

:deep(.right-wrapper) {
  .user-info {
    .el-dropdown-link {
      color: var(--el-text-color-regular) !important;
    }
  }

  .current-time {
    span {
      color: var(--el-text-color-regular) !important;
    }
  }

  .screen-box {
    color: var(--el-text-color-regular) !important;
  }

  .message-box {
    padding-top: 6px !important;
    margin-right: 8px !important;

    .msg-icon {
      color: var(--el-text-color-regular) !important;
    }
  }
}
</style>
