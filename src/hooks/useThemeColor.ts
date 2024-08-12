import { ref, computed, onMounted } from "vue";
import useSettingStore from "@/store/modules/settingStore";
import defaultSetting from "@/setting";

const useThemeColor = () => {
  const settingStore = useSettingStore();
  interface ThemeColors {
    [key: string]: string[];
  }
  interface ThemeNames {
    [key: string]: string;
  }
  const formatThemeName = ref<ThemeNames>({
    classicThemeColors: "经典主题",
    fashionThemeColors: "时尚主题",
    freshThemeColors: "清新主题",
    coolThemeColors: "热情主题",
  });
  const currentThemeName = computed(() => {
    return formatThemeName.value[currentTheme.value];
  });

  const themeColorName = ref<ThemeColors>({
    classicThemeColors: [
      "#409EFF",
      "#337ecc",
      "#79bbff",
      "#a0cfff",
      "#c6e2ff",
      "#d9ecff",
      "#ecf5ff",
    ], // 经典配色
    fashionThemeColors: [
      "#3170FF",
      "#296DFF",
      "#4F8DFF",
      "#75AAFF",
      "#9CC5FF",
      "#C2DDFF",
      "#E8F3FF",
    ], // 时尚配色
    freshThemeColors: [
      "#67C23A",
      "#529b2e",
      "#95d475",
      "#b3e19d",
      "#d1edc4",
      "#e1f3d8",
      "#f0f9eb",
    ], // 清新配色
    coolThemeColors: [
      "#BF145B",
      "#E5206C",
      "#EA457F",
      "#EF6B95",
      "#F593AF",
      "#FABDCC",
      "#FFE8ED",
    ], // 热情配色
  });
  const DEFAULT_THEME = defaultSetting.themeName;
  const DEFAULT_PRIMARY = defaultSetting.color;
  const currentTheme = ref(DEFAULT_THEME);
  const currentColor = ref(DEFAULT_PRIMARY);

  const toggleThemeColor = (
    colorThemeName: keyof ThemeColors | undefined = "classicThemeColors"
  ) => {
    const colors = themeColorName.value[colorThemeName];
    const primaryColor = colors[0];
    const primaryDarkColor2 = colors[1];
    const primaryLightColor3 = colors[2];
    const primaryLightColor5 = colors[3];
    const primaryLightColor7 = colors[4];
    const primaryLightColor8 = colors[5];
    const primaryLightColor9 = colors[6];

    // 计算主题颜色变化
    document.documentElement.style.setProperty(
      "--el-color-primary",
      primaryColor
    );
    document.documentElement.style.setProperty(
      "--el-color-primary-dark-2",
      primaryDarkColor2
    );
    document.documentElement.style.setProperty(
      "--el-color-primary-light-3",
      primaryLightColor3
    );
    document.documentElement.style.setProperty(
      "--el-color-primary-light-5",
      primaryLightColor5
    );
    document.documentElement.style.setProperty(
      "--el-color-primary-light-7",
      primaryLightColor7
    );
    document.documentElement.style.setProperty(
      "--el-color-primary-light-8",
      primaryLightColor8
    );
    document.documentElement.style.setProperty(
      "--el-color-primary-light-9",
      primaryLightColor9
    );

    currentTheme.value = colorThemeName as string;
    currentColor.value = primaryColor;

    settingStore.updateSetting({
      layout: settingStore.layout,
      showFooterBar: settingStore.showFooterBar,
      showHeaderBar: settingStore.showHeaderBar,
      showHeaderLogo: settingStore.showHeaderLogo,
      showTagsView: settingStore.showTagsView,
      showBreadcrumb: settingStore.showBreadcrumb,
      color: primaryColor,
      themeName: colorThemeName,
      topShowCollapsed: settingStore.topShowCollapsed,
    });
  };
  onMounted(() => {
    currentTheme.value = settingStore.themeName || defaultSetting.themeName;
  });
  return {
    toggleThemeColor,
    currentTheme,
    currentColor,
    currentThemeName,
    themeColorName,
  };
};

export default useThemeColor;
