<template>
  <div class="header-menu">
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
          <template #title>{{ menu.meta?.title }}</template>
          <el-menu-item
            v-for="child in menu.children"
            :key="child.path"
            :index="child.path"
            >{{ child.meta?.title }}</el-menu-item
          >
        </el-sub-menu>
        <el-menu-item v-else :key="menu.path" :index="menu.path">
          {{ menu.meta?.title }}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { isExternalFn } from "@/utils/validate";
import { RouteRecordRaw, useRouter, useRoute } from "vue-router";
import useUserStore from "@/store/modules/userStore";
import config from "@/styles/config.module.scss";
import useSettingStore from "@/store/modules/settingStore";
const activeIndex = ref("/");
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const settingStore = useSettingStore();
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
    console.log(pathList, "pathList");
    if (pathList.length === 2) {
      keyName = pathList[0];
      activeIndex.value = `/${pathList[0]}`;
    } else if (pathList.length >= 3) {
      activeIndex.value = `/${pathList[0]}/${pathList[1]}`;
      keyName = keyName = pathList[1];
    } else {
      activeIndex.value = "/";
      keyName = pathList[0];
    }
    const test = userStore.flatMenuList.find(
      (item: any) =>
        item.name === keyName && item.children && item.children.length > 0
    );
    if (test && test.children) {
      userStore.updateLeftMenus(test.children as any);
    } else {
      userStore.updateLeftMenus([] as any);
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

<style lang="scss">
.header-menu {
  flex: 1;
  min-width: 730px;
  .top-menu {
    height: $base-top-menu-height;
    border: 0px;

    .el-menu-item,
    .el-sub-menu .el-sub-menu__title {
      font-size: 17px;
    }
  }
}

.el-menu--popup {
  .el-menu-item {
    font-size: 15px;
  }
}
</style>
