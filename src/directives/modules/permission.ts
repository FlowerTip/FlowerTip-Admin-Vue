/**
 * v-permission
 * 按钮权限指令
 */
import useUserStore from "@/store/modules/userStore";
import type { Directive, DirectiveBinding } from "vue";

const permission: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;
    const userStore = useUserStore();
    const currentPageButtons = userStore.permissionButtonList ?? [];
    if (value instanceof Array && value.length) {
      const hasPermission = value.every((item) =>
        currentPageButtons.includes(item)
      );
      if (!hasPermission) el.remove();
    } else {
      if (!currentPageButtons.includes(value)) el.remove();
    }
  },
};

export default permission;
