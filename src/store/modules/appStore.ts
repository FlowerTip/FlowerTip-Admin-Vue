import { defineStore } from "pinia";

const useAppStore = defineStore({
  id: "app",
  state: () => {
    return {
      isCollapsed: false,
      lang: 'zh-cn'
    };
  },
  actions: {
    updateCollapseMenu() {
      this.isCollapsed = !this.isCollapsed;
    },
    toggleLang(lang: string) {
      this.lang = lang;
      sessionStorage.setItem('lang', this.lang);
    }
  },
});

export default useAppStore;
