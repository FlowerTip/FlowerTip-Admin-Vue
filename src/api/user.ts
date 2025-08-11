import instance from "@/utils/service";

// 用户接口相关的的枚举类型
enum API {
  LOGIN_URL = "/auth/login",
  USERINFO_URL = "/auth/profile",
  LOGOUT_URL = "/auth/logout",
  GET_ROLE = "/auth/getRole",
  REFRESH_TOKEN = "/auth/refreshToken",
  ACCOUNT = "/account",
}

// 用户登录接口
export const reqLogin = (data: Req.loginParam) =>
  instance.post<Res.LoginData>(API.LOGIN_URL, data);

// 获取用户信息接口
export const reqUserInfo = () =>
  instance.get<Res.UserInfoData>(API.USERINFO_URL);

// 退出登录接口
export const reqLogout = () => instance.get<Res.LogoutData>(API.LOGOUT_URL);

// 获取当前登入账号拥有的角色列表接口
export const reqGetRole = (id: number) =>
  instance.get<Res.SelectRoleListData<RoleItem>>(API.ACCOUNT + "/" + id);

export const reqRefreshToken = () =>
  instance.get<Res.LoginData>(API.REFRESH_TOKEN);
