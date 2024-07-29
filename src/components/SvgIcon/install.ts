import type { App } from "vue";
import * as svg from "@element-plus/icons-vue";
import SvgIcon from "@/components/SvgIcon/index.vue";

export default function (app: App) {
  //SvgIcon变为全局组件
  app.component("svg-icon", SvgIcon);
  //全部element-plus图标
  const icons = svg as any;

  for (const i in icons) {
    app.component(`ele-${icons[i].name}`, icons[i]);
  }
}
