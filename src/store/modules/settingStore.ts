import { defineStore } from "pinia";
import defaultSetting from "@/setting";

const useSettingStore = defineStore({
  id: "setting",
  state: (): AppTypeConfig.SettingConfig => {
    return {
      showFooterBar: defaultSetting.showFooterBar,
      showHeaderBar: defaultSetting.showHeaderBar,
      showHeaderLogo: defaultSetting.showHeaderLogo,
      showTagsView: defaultSetting.showTagsView,
      showBreadcrumb: defaultSetting.showBreadcrumb,
      layout: defaultSetting.layout,
      color: defaultSetting.color,
      themeName: defaultSetting.themeName,
      topShowCollapsed: defaultSetting.topShowCollapsed,
    };
  },
  actions: {
    updateSetting(settingConfig: AppTypeConfig.SettingConfig) {
      this.$patch({
        ...settingConfig,
      });
    },
  },
});

export default useSettingStore;
