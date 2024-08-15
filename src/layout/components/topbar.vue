<template>
  <div class="header-menu">
    <!-- 收缩菜单按钮 -->
    <span v-if="showCollapseBtn" class="toggle-btn" @click="toggleCollapse">
      <el-icon size="21px">
        <Fold v-show="!appStore.isCollapsed" />
        <Expand v-show="appStore.isCollapsed" />
      </el-icon>
    </span>
    <el-menu
      :default-active="activeIndex"
      class="top-menu"
      mode="horizontal"
      @select="handleSelect"
      :background-color="menuConfig.baseTopMenuBackground"
      :text-color="menuConfig.baseTopMenuTextColor"
      :active-text-color="settingStore.color"
    >
      <template v-for="menu in authMenuList">
        <el-sub-menu
          v-if="menu.children && menu.children[0].redirect"
          :index="menu.path"
          :key="menu.children[0].path"
        >
          <template #title
            ><svg-icon
              v-if="menu.meta?.icon"
              :name="menu.meta.icon"
              :size="17"
            ></svg-icon
            >{{ menu.meta?.title }}</template
          >
          <el-menu-item
            v-for="child in menu.children"
            :key="child.path"
            :index="child.path"
          >
            <svg-icon
              v-if="child.meta?.icon"
              :name="child.meta.icon"
              :size="17"
            ></svg-icon
            >{{ child.meta?.title }}</el-menu-item
          >
        </el-sub-menu>
        <el-menu-item v-else :key="menu.path" :index="menu.path">
          <svg-icon
            v-if="menu.meta?.icon"
            :name="menu.meta.icon"
            :size="17"
          ></svg-icon>
          {{ menu.meta?.title }}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import { isExternalFn } from "@/utils/validate";
import { RouteRecordRaw, useRouter, useRoute } from "vue-router";
import { Fold, Expand } from "@element-plus/icons-vue";
import useUserStore from "@/store/modules/userStore";
import config from "@/styles/config.module.scss";
import useSettingStore from "@/store/modules/settingStore";
import useAppStore from "@/store/modules/appStore";

const activeIndex = ref("/");
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const settingStore = useSettingStore();
const appStore = useAppStore();

const showCollapseBtn = computed(() => {
  return settingStore.topShowCollapsed && settingStore.layout === "mixbar";
});

const toggleCollapse = () => {
  appStore.updateCollapseMenu();
};

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
  // 如果是链接
  if (
    isExternalFn(
      userStore.flatMenuList.find((item) => item.path === key)
        ?.redirect as string
    )
  ) {
    window.open(
      userStore.flatMenuList.find((item) => item.path === key)
        ?.redirect as string
    );
    return;
  } else {
    router.push(key);
  }
};
handleSelect(route.path, [route.path]);

watch(
  route,
  (newVal) => {
    console.log(newVal.path, newVal.fullPath, newVal.matched, "newVal");
    let keyName = "";
    const pathList = newVal.fullPath.split("/").filter((item) => item);
    if (pathList.length >= 3) {
      if (settingStore.layout === "mixbar") {
        const isSecondLevel = newVal.matched[0].children.every(
          (item) => item.children && item.children.length > 0
        );
        if (isSecondLevel) {
          keyName = pathList[1];
          activeIndex.value = `/${pathList[0]}/${pathList[1]}`;
        } else {
          keyName = pathList[0];
          activeIndex.value = `/${pathList[0]}`;
        }
      } else {
        keyName = pathList[1];
        activeIndex.value = `/${pathList[0]}/${pathList[1]}`;
      }
    } else if (pathList.length === 2) {
      keyName = pathList[0];
      activeIndex.value = `/${pathList[0]}`;
    } else {
      keyName = pathList[0];
      activeIndex.value = "/";
    }
    const test = userStore.flatMenuList.find(
      (item) =>
        item.name === keyName && item.children && item.children.length > 0
    );
    if (test && test.children) {
      userStore.updateLeftMenus(test.children as unknown as RouteRecordRaw[]);
    } else {
      userStore.updateLeftMenus([]);
    }
  },
  { immediate: true }
);

const menuConfig = ref({
  baseTopMenuBackground: config.baseTopMenuBackground,
  baseTopMenuTextColor: config.baseTopMenuTextColor,
  baseTopMenuActiveTextColor: config.baseTopMenuActiveTextColor,
});

const authMenuList: RouteRecordRaw[] = userStore.authMenuList.filter(
  (item) => !item.meta?.hidden
);
</script>

<style lang="scss" scoped>
.header-menu {
  flex: 1;
  min-width: 100px;
  display: flex;
  align-items: center;

  .toggle-btn {
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.8);

    .el-icon {
      color: #fff;
    }
  }

  .top-menu {
    width: 100%;
    height: $base-top-menu-height;
    border: 0px;

    .el-menu-item {
      font-size: 16px;
    }

    .el-sub-menu {
      :deep(.el-sub-menu__title) {
        font-size: 16px;
      }
    }
  }
}

.el-menu--popup {
  .el-menu-item {
    font-size: 15px;
  }
}
</style>
