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
      roleNames: "", // 角色名称
      workPostName: "", // 岗位名称
      departmentName: "", // 部门名称
    };
  },
  getters: {
    flatMenuList: (state) => {
      const menuParams = [
        ...staticRoutes.filter((item) => !item.meta?.hidden),
        ...state.backMenuList,
      ];
      return getFlatMenuList(menuParams);
    },
  },
  actions: {
    async login({ username, password }: Req.loginParam) {
      const { code, data } = await reqLogin({
        username,
        password,
      });
      if (code === 200) {
        this.token = data.token;
        setToken(data.token);
        return Promise.resolve(data);
      }
    },
    async getUserInfo() {
      const { code, data } = await reqUserInfo();
      if (code === 200) {
        this.username = data.checkUser.username;
        this.roleNames = data.checkUser.roleNames;
        this.workPostName = data.checkUser.workPostName;
        this.departmentName = data.checkUser.departmentName;
        if (data.list.length > 0) {
          let menuList = [];
          if (process.env.NODE_ENV === "production") {
            menuList = filterAsyncRoutes(
              asyncRoute as RouteRecordRaw[],
              data.list.map((item) => item.code)
            );
          } else {
            menuList = [...asyncRoute] as RouteRecordRaw[];
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
            router.addRoute(item);
          });
        } else {
          ElMessage.error("无权限访问任何页面，请联系管理员处理");
          this.logout();
        }
      }
      return Promise.resolve(data.list);
    },
    async logout() {
      await reqLogout(true);
      removeToken();
      this.$reset();
    },
    updateLeftMenus(data: RouteRecordRaw[]) {
      this.sidebarMenuList = data;
    },
  },
});

export default useUserStore;
