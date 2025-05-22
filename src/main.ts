// 1. 从vue中引入创建应用实例的方法createApp
import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/display.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "virtual:svg-icons-register";
import router from "@/router";
import pinia from "@/store";
import directives from "@/directives/index";
import i18n from "./language";
// 引入全局的样式
import "@/styles/index.scss";
// 2. 应用App根组件
import App from "@/App.vue";
import "./permission";

// 3. 创建应用实例
const app = createApp(App);

// 注册全部ele-plus里面图标变为全局组件ele-xxx
import InstallSvg from "./components/SvgIcon/install";
InstallSvg(app);

// 使用ElementPlus UI组件库构建页面布局
app.use(ElementPlus, {
  locale: zhCn,
  size: "default",
});

// 使用路由器管理路由菜单
app.use(router);

// 使用国际化功能
app.use(i18n);

// 使用pinia管理状态数据
app.use(pinia);

// 使用自定义指令实现个性化功能
app.use(directives);

// 4. 应用实例挂载到页面上去
app.mount("#app");
