// 1. 从vue中引入创建应用实例的方法createApp
import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/display.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "virtual:svg-icons-register";

// 2. 应用App根组件
import router from "@/router";
import pinia from "@/store";
import directives from "@/directives/index";
//引入模板的全局的样式
import "@/styles/index.scss";
import App from "./App.vue";
import "./permission";

// 3. 创建应用实例
const app = createApp(App);

//注册全部ele-plus里面图标变为全局组件ele-xxx
import InstallSvg from "./components/SvgIcon/install";
InstallSvg(app);

// 应用ElementPlus组件库
app.use(ElementPlus, {
  locale: zhCn,
  size: "default",
});

app.use(router);

app.use(pinia);

app.use(directives);

// 4. 应用实例挂载到页面上去
app.mount("#app");
