import instance from "@/utils/service";

// 账号相关请求地址的枚举类型
enum API {
  ACCOUNT = "/account",
}

// 获取账号数据接口
export const reqAccountList = (data: Req.AccountListParam) =>
  instance.get<Res.AccountListRes>(API.ACCOUNT, data);

// 保存账号信息接口
export const reqSaveAccount = (data: Req.SaveAccountParam) => {
  if (data.id) {
    const editId = data.id;
    delete data.id; // 删除id字段，避免传递到后端
    return instance.patch<Res.SaveAccountRes>(API.ACCOUNT + "/" + editId, data);
  } else {
    return instance.post<Res.SaveAccountRes>(API.ACCOUNT, data);
  }
};

// 删除账号信息接口
export const reqDelAccount = (id: number) =>
  instance.delete<Res.DelAccountRes>(API.ACCOUNT + "/" + id);

// 账号绑定角色信息接口
export const reqBatchRole = (id: number, data: Req.BatchRoleParam) =>
  instance.post<Res.BatchRoleRes>(API.ACCOUNT + "/" + id + "/roles", data);
