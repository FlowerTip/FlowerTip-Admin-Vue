import { defineStore } from "pinia";
import defaultSetting from "@/setting";

const useSettingStore = defineStore({
  id: "setting",
  state: () => {
    return {
      showFooterBar: defaultSetting.showFooterBar,
      showHeaderBar: defaultSetting.showHeaderBar,
      showHeaderLogo: defaultSetting.showHeaderLogo,
      showTagsView: defaultSetting.showTagsView,
      showBreadcrumb: defaultSetting.showBreadcrumb,
      layout: defaultSetting.layout,
      color: defaultSetting.color,
    };
  },
  actions: {
    updateSetting(data: any) {
      this.showHeaderBar = data.showHeaderBar;
      this.showFooterBar = data.showFooterBar;
      this.showHeaderLogo = data.showHeaderLogo;
      this.showTagsView = data.showTagsView;
      this.showBreadcrumb = data.showBreadcrumb;
      this.layout = data.layout;
      this.color = data.color;
    },
  },
});

export default useSettingStore;
