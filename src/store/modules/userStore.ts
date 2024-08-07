import { defineStore } from "pinia";
import { getToken, setToken, removeToken, getFlatMenuList } from "@/utils/auth";
import { filterAsyncRoutes } from "@/utils/tool";
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user";
import { StatePermission } from "@/types";
import router from "@/router";
import { RouteRecordRaw } from "vue-router";
import { anyRoute, staticRoutes, asyncRoute } from "@/router/modules/routes";
import { ElMessage } from "element-plus";

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
      const { code, data } = await reqUserInfo();
      if (code === 200) {
        this.username = data.checkUser.username;
        if (data.list.length > 0) {
          const menuList = filterAsyncRoutes(
            asyncRoute as unknown as RouteRecordRaw[],
            data.list.map((item: any) => item.code)
          );
          this.backMenuList = menuList;
          this.permissionButtonList = data.buttons;
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
        } else {
          ElMessage.error("无权限访问任何页面，请联系管理员处理");
          this.logout(false);
        }
      }
      return Promise.resolve(data.list);
    },
    async logout(isRefresh = true) {
      removeToken();
      this.$reset()
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
