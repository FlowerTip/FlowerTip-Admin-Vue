import router from "@/router";
import { defineStore } from "pinia";
import { getUrlWithParams } from "@/utils/tool.ts";
import { TabsState, TabsMenuProps } from "@/store/types";
const useTagsViewStore = defineStore({
  id: "tagsView",
  state: (): TabsState => ({
    tabsMenuList: [],
  }),
  actions: {
    // Add Tabs
    async addTab(tabItem: TabsMenuProps) {
      if (this.tabsMenuList.every((item) => item.path !== tabItem.path)) {
        this.tabsMenuList.push(tabItem);
      }
    },
    // Remove Tabs
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
      // set tabs
      this.tabsMenuList = this.tabsMenuList.filter(
        (item) => item.path !== tabPath
      );
    },
    // Close Tabs On Side
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
    // Close MultipleTab
    async closeMultipleTab(tabsMenuValue?: string) {
      this.tabsMenuList = this.tabsMenuList.filter((item) => {
        return item.path === tabsMenuValue || !item.close;
      });
    },
    // Set Tabs
    async setTab(tabsMenuList: TabsMenuProps[]) {
      this.tabsMenuList = tabsMenuList;
    },
    // Set Tabs Title
    async setTabsTitle(title: string) {
      this.tabsMenuList.forEach((item) => {
        if (item.path == getUrlWithParams()) item.title = title;
      });
    },
  },
});

export default useTagsViewStore;
