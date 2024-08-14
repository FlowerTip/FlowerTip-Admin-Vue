import { ElMessage } from "element-plus";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getPageTitle } from "@/utils/tool";
import router from "./router";
import store from "./store";
import useUserStore from "./store/modules/userStore";

// 进度条配置对象
NProgress.configure({
  easing: "ease", // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
});

// 路由白名单
const whiteRouteList = ["/403", "/404", "/500"];
const userStore = useUserStore(store);

// 全局前置守卫
router.beforeEach(async (to, _, next) => {
  NProgress.start();
  document.title = getPageTitle(to);
  const token = userStore.token;
  const username = userStore.username;
  // 登录成功
  if (token) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      // 获取用户信息成功，token有效
      if (username) {
        next();
      } else {
        try {
          await userStore.getUserInfo();
          next({
            ...to,
            replace: true,
          });
          NProgress.done(); // 结束进度条
        } catch (error) {
          console.log(error, "erer");
          ElMessage({
            type: "error",
            message: "登录失败，页面自动刷新尝试重新登录",
          });
          setTimeout(async () => {
            await userStore.logout(false);
            next({ path: "/login", query: { redirect: to?.path } });
          }, 1000);
        }
      }
    }
  } else {
    // 未登录状态
    if (to.path === "/login") {
      next();
    } else {
      if (whiteRouteList.includes(to.path)) {
        return next();
      }
      next({ path: "/login", query: { redirect: to?.path } });
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
