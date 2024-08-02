import { defineStore } from "pinia";
import { getToken, setToken, removeToken, getFlatMenuList } from "@/utils/auth";
import { filterAsyncRoutes } from "@/utils/tool";
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user";
import { LoginResponseResult, StatePermission } from "@/types";
import router from "@/router";
import { RouteRecordRaw } from "vue-router";
import { anyRoute, staticRoutes, asyncRoute } from "@/router/modules/routes";

const useUserStore = defineStore({
  id: "user",
  state: (): StatePermission => {
    return {
      token: getToken(),
      username: "",
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
    async login(
      username: Login.ReqParams["username"],
      password: LoginParams["password"]
    ) {
      const result = await reqLogin({
        username,
        password,
      });
      this.token = result.data.token;
      setToken(result.data.token);
      return Promise.resolve(result.data);
    },
    async getUserInfo() {
      const result = await reqUserInfo();
      this.username = result.data.checkUser.username;
      const menuList = filterAsyncRoutes(
        asyncRoute as unknown as RouteRecordRaw[],
        result.data.list.map((item: any) => item.code)
      );
      this.backMenuList = menuList;
      this.permissionButtonList = result.data.buttons;
      //左侧菜单需要数组
      this.authMenuList = [...menuList, anyRoute] as any;
      //当前的路由器仅仅注册常量路由,路由器还需要注册任意路由、过滤完的异步路由----router.addRoute
      router.addRoute({
        path: "/",
        meta: {
          hidden: true,
        },
        redirect: this.authMenuList[0].path,
      });
      this.authMenuList.forEach((item) => {
        router.addRoute(item as unknown as RouteRecordRaw);
      });
    },
    async logout() {
      this.token = "";
      this.username = "";
      this.authMenuList = [];
      this.sidebarMenuList = [];
      this.permissionButtonList = [];
      await reqLogout(true);
      removeToken();
      window.location.reload();
    },
    updateLeftMenus(data: RouteRecordRaw[]) {
      this.sidebarMenuList = data;
    },
  },
});

export default useUserStore;
