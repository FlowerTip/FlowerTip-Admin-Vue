import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";
import { ElMessage } from "element-plus";
import router from "@/router";
import { StatePermission } from "@/types";
import { anyRoute, staticRoutes, asyncRoute } from "@/router/modules/routes";
import { getToken, setToken, removeToken, getFlatMenuList } from "@/utils/auth";
import { filterAsyncRoutes } from "@/utils/tool";
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user";

const useUserStore = defineStore({
  id: "user",
  state: (): StatePermission => {
    return {
      token: getToken(), // Token令牌
      username: "", // 当前登录账号用户名
      backMenuList: [], // 后台获取的菜单
      permissionButtonList: [], // 按钮列表
      authMenuList: [], // 权限菜单
      sidebarMenuList: [], // 侧边栏菜单
    };
  },
  getters: {
    flatMenuList: (state) =>
      getFlatMenuList([
        ...staticRoutes.filter((item) => !item.meta?.hidden),
        ...state.backMenuList,
      ] as any),
  },
  actions: {
    async login({ username, password }: Req.loginParam) {
      const result = await reqLogin({
        username,
        password,
      });
      this.token = result.data.token;
      setToken(result.data.token);
      return Promise.resolve(result.data);
    },
    async getUserInfo() {
      const { code, data } = await reqUserInfo();
      if (code === 200) {
        this.username = data.checkUser.username;
        if (data.list.length > 0) {
          let menuList = [];
          if (process.env.NODE_ENV === "production") {
            menuList = filterAsyncRoutes(
              asyncRoute as unknown as RouteRecordRaw[],
              data.list.map((item) => item.code)
            );
          } else {
            menuList = [...(asyncRoute as unknown as RouteRecordRaw[])];
          }
          this.backMenuList = menuList;
          this.permissionButtonList = data.buttons;
          //左侧菜单需要数组
          this.authMenuList = [...menuList, anyRoute];
          //当前的路由器仅仅注册常量路由,路由器还需要注册任意路由、过滤完的异步路由----router.addRoute
          router.addRoute({
            path: "/",
            meta: {
              hidden: true,
            },
            redirect: this.authMenuList[0].redirect!,
          });
          this.authMenuList.forEach((item) => {
            router.addRoute(item as unknown as RouteRecordRaw);
          });
        } else {
          ElMessage.error("无权限访问任何页面，请联系管理员处理");
          this.logout(false);
        }
      }
      return Promise.resolve(data.list);
    },
    async logout(isRefresh = true) {
      removeToken();
      this.$reset();
      if (isRefresh) {
        await reqLogout(true);
        window.location.reload();
      }
    },
    updateLeftMenus(data: RouteRecordRaw[]) {
      this.sidebarMenuList = data;
    },
  },
});

export default useUserStore;
