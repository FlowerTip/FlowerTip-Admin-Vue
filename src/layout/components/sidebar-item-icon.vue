<template v-if="!item.meta || !item.meta.hidden">
  <template v-if="
    hasOneShowingChild(item.children, item) &&
    (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
    !item.alwaysShow
  ">
    <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }"
      :to="resolvePath(onlyOneChild.path)" @click="menuItemClick">
      <svg-icon v-if="onlyOneChild.meta.icon" :name="onlyOneChild.meta.icon" :size="16" />
      <template #title>{{ onlyOneChild.meta.title }}</template>
    </el-menu-item>
  </template>

  <el-sub-menu v-else ref="subMenuRef" :index="resolvePath(item.path)" popper-append-to-body>
    <template #title>
      <svg-icon v-if="item.meta.icon" :name="item.meta.icon" :size="16" />
      <span>{{ item.meta.title }}</span>
    </template>
    <sidebar-item v-for="child in item.children" :key="child.path" is-nest :item="child"
      :base-path="resolvePath(settingStore.layout === 'mixbar' ? item.path : child.path)" class="nest-menu" />
  </el-sub-menu>
</template>

<script lang="ts">
export default {
  name: "SidebarItem",
};
</script>

<script lang="ts" setup>
import { isExternalFn } from "@/utils/validate";
import { resolve } from "@/utils/tool";
import type { ElSubMenu } from "element-plus";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import useSettingStore from "@/store/modules/settingStore";

const router = useRouter();

const settingStore = useSettingStore();

const currentRoute = useRoute();

const menuItemClick = () => {
  const path = resolvePath(onlyOneChild.value.path);
  console.log(onlyOneChild, path, 'path@@@@');

  // 外部链接
  if (isExternalFn(path)) {
    window.open(path, "_blank");
  } else {
    console.log(path, 'retyuinrt');
    if (settingStore.layout === 'mixbar') {
      if (onlyOneChild.value.meta.parentName) {
        router.push(path);
      } else {
        router.push({
          name: path
        });
      }
    } else {
      router.push(path);
    }
  }
};
const subMenuRef = ref<InstanceType<typeof ElSubMenu>>();

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
  basePath: {
    type: String,
    default: "",
  },
});

const onlyOneChild = ref<any>({});

const hasOneShowingChild = (children = [], parent: any) => {
  const showingChildren = children.filter((item: any) => {
    if (item.meta.hidden) {
      return false;
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item;
      return true;
    }
  });

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true;
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }

  return false;
};

console.log(
  hasOneShowingChild(props.item.children, props.item),
  onlyOneChild,
  "onlyOneChild"
);

const resolvePath = (routePath: string) => {
  if (isExternalFn(routePath)) {
    return routePath;
  }
  if (isExternalFn(props.basePath)) {
    return props.basePath;
  }

  if (settingStore.layout === 'mixbar') {
    if (onlyOneChild.value.meta.parentName) {
      const currPath = `${onlyOneChild.value.meta.parentName}/${onlyOneChild.value.name}`
      console.log(currPath, 'currPath');
      return resolve(
        currentRoute.matched[0].path as unknown as IArguments,
        currPath as unknown as IArguments
      );
    } else {
      return resolve(
        props.basePath as unknown as IArguments,
        routePath as unknown as IArguments
      );
    }
  } else {
    return resolve(
      props.basePath as unknown as IArguments,
      routePath as unknown as IArguments
    );
  }

};
</script>

<style lang="scss" scoped></style>
