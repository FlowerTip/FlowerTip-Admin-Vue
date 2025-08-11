import instance from "@/utils/service";

// 账号相关请求地址的枚举类型
enum API {
  LOGGER = "/logs",
}

// 获取账号数据接口
export const reqLoggerList = (data: Req.AccountListParam) =>
  instance.get<Res.LoggerListData>(API.LOGGER, data);
