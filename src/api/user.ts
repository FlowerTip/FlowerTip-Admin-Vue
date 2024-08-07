import instance from "@/utils/request";
import { LoginRequestParams, PagainationType } from "@/types";

import { getToken } from "@/utils/auth";

// 定义一个接口的枚举类型
enum API {
  LOGIN_URL = "/user/login",

  USERINFO_URL = "/user/info",

  LOGOUT_URL = "/user/logout",

  USER_LIST = "/user/userList",

  SAVE_USER = "/user/saveUser",

  DEL_USER = "/user/delUser",

  BATCH_ROLE = "/user/batchRole",

  GET_ROLE = "/user/getRole",

  MENU_URL = "/permission/menus",

  ROLE_LIST = "/permission/roleList",

  ADD_ROLE_INFO = "/permission/saveRole",

  DEL_ROLE_INFO = "/permission/delRole",

  UPLOAD_AVATAR = "/upload/avatar",
}

export const reqLogin = (data: LoginRequestParams) =>
  Promise.resolve(instance.post<any, Response.LoginRes>(API.LOGIN_URL, data));

export const reqUserInfo = () =>
  Promise.resolve(instance.get<any, Response.UserInfoRes>(API.USERINFO_URL));

export const reqLogout = (status: boolean) =>
  Promise.resolve(instance.post(API.LOGOUT_URL, { status }));

export const reqPermissionMenus = (username: string) =>
  Promise.resolve(instance.get(API.MENU_URL + "?username=" + username));

export const reqTableList = (data: PagainationType) =>
  Promise.resolve(instance.post(API.ROLE_LIST, data));

export const reqSaveTable = (data: any) =>
  Promise.resolve(instance.post(API.ADD_ROLE_INFO, data));

export const reqDelTable = (data: any) =>
  Promise.resolve(instance.post(API.DEL_ROLE_INFO, data));

export const reqUploadAvatar = (data: any) =>
  Promise.resolve(
    instance.post(API.UPLOAD_AVATAR, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getToken()}`,
      },
    })
  );

export const reqGetUserList = (data: any) =>
  Promise.resolve(instance.post(API.USER_LIST, data));

export const reqSaveUser = (data: any) =>
  Promise.resolve(instance.post(API.SAVE_USER, data));

export const reqDelUser = (data: any) =>
  Promise.resolve(instance.post(API.DEL_USER, data));

export const reqBatchRole = (data: any) =>
  Promise.resolve(instance.post(API.BATCH_ROLE, data));

export const reqGetRole = (data: any) =>
  Promise.resolve(
    instance.get(API.GET_ROLE, {
      params: data,
    })
  );
