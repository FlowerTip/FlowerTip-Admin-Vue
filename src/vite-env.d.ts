/// <reference types="vite/client" />
declare module "table-excel";
declare module "mockjs";
declare module "element-plus/dist/locale/zh-cn.mjs";
declare module "element-plus/dist/locale/en.mjs";
declare module "markdown-it";
declare const __APP_VERSION__: string;
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
