import router from "@/router";
import { defineStore } from "pinia";
import { TabsState, TabsMenuProps } from "@/store/types";

const useTagsViewStore = defineStore({
  id: "tagsView",
  state: (): TabsState => ({
    tabsMenuList: [],
  }),
  actions: {
    // 添加标签
    async addTab(tabItem: TabsMenuProps) {
      if (this.tabsMenuList.every((item) => item.path !== tabItem.path)) {
        this.tabsMenuList.push(tabItem);
      }
    },
    // 删除标签
    async removeTab(tabPath: string, isCurrent = true) {
      if (this.tabsMenuList.length === 1) return;
      if (isCurrent) {
        this.tabsMenuList.forEach((item, index) => {
          if (item.path !== tabPath) return;
          const nextTab =
            this.tabsMenuList[index + 1] || this.tabsMenuList[index - 1];
          if (!nextTab) return;
          router.push(nextTab.path);
        });
      }
      // 重新设置标签组
      this.tabsMenuList = this.tabsMenuList.filter(
        (item) => item.path !== tabPath
      );
    },
    // 关闭标签（以自身为轴心，向左或向右关闭标签）
    async closeTabsOnSide(path: string, type: "left" | "right") {
      const currentIndex = this.tabsMenuList.findIndex(
        (item) => item.path === path
      );
      if (currentIndex !== -1) {
        const range =
          type === "left"
            ? [0, currentIndex]
            : [currentIndex + 1, this.tabsMenuList.length];
        this.tabsMenuList = this.tabsMenuList.filter((item, index) => {
          return index < range[0] || index >= range[1] || !item.close;
        });
      }
    },
    // 关闭其他标签
    async closeMultipleTab(tabsMenuValue?: string) {
      this.tabsMenuList = this.tabsMenuList.filter((item) => {
        return item.path === tabsMenuValue || !item.close;
      });
    },
  },
});

export default useTagsViewStore;
