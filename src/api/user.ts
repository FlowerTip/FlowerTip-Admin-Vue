import instance from "@/utils/request";

// 用户接口相关的的枚举类型
enum API {
  LOGIN_URL = "/user/login",
  USERINFO_URL = "/user/info",
  LOGOUT_URL = "/user/logout",
  GET_ROLE = "/user/getRole",
}

// 用户登录接口
export const reqLogin = (data: RequestData.loginParam) =>
  Promise.resolve(
    instance.post<typeof data, Response.LoginRes>(API.LOGIN_URL, data)
  );

// 获取用户信息接口
export const reqUserInfo = () =>
  Promise.resolve(instance.get<any, Response.UserInfoRes>(API.USERINFO_URL));

// 退出登录接口
export const reqLogout = (status: boolean) =>
  Promise.resolve(
    instance.post<typeof status, Response.LogoutRes>(API.LOGOUT_URL, { status })
  );

// 获取当前登入账号拥有的角色列表接口
export const reqGetRole = (data: RequestData.GetRoleParam) =>
  Promise.resolve(
    instance.get<typeof data, Response.RoleListRes>(API.GET_ROLE, {
      params: data,
    })
  );
