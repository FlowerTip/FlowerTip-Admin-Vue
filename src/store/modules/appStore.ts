import { defineStore } from "pinia";

const useAppStore = defineStore({
  id: "app",
  state: () => {
    return {
      isCollapsed: false,
    };
  },
  actions: {
    updateCollapseMenu() {
      this.isCollapsed = !this.isCollapsed;
    },
  },
});

export default useAppStore;
