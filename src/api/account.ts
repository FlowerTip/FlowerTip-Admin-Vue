import instance from "@/utils/request";

// 账号相关请求地址的枚举类型
enum API {
  USER_LIST = "/user/userList",
  SAVE_USER = "/user/saveUser",
  DEL_USER = "/user/delUser",
  BATCH_ROLE = "/user/batchRole",
}

// 获取账号数据接口
export const reqAccountList = (data: any) =>
  Promise.resolve(instance.post(API.USER_LIST, data));

// 保存账号信息接口
export const reqSaveAccount = (data: RequestData.SaveAccountParam) =>
  Promise.resolve(instance.post<typeof data, any>(API.SAVE_USER, data));

// 删除账号信息接口
export const reqDelAccount = (data: RequestData.DelAccountParam) =>
  Promise.resolve(instance.post<typeof data, any>(API.DEL_USER, data));

// 账号绑定角色信息接口
export const reqBatchRole = (data: any) =>
  Promise.resolve(instance.post(API.BATCH_ROLE, data));

