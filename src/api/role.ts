import instance from "@/utils/request";
import { PagainationType } from "@/types";

// 定义一个接口的枚举类型
enum API {
  MENU_LIST = "/role/roleList",

  ADD_MENU__INFO = "/role/saveRole",

  DEL_MENU__INFO = "/role/delRole",

  BATCH_PERMISSION = "/role/batchPermission",

  GET_PERMISSION = "/role/getPermission",
}

export const reqRoleList = (data: PagainationType) =>
  Promise.resolve(instance.post(API.MENU_LIST, data));

export const reqSaveRole = (data: any) =>
  Promise.resolve(instance.post(API.ADD_MENU__INFO, data));

export const reqDelRole = (data: any) =>
  Promise.resolve(
    instance.delete(API.DEL_MENU__INFO, {
      params: data,
    })
  );

export const reqBatchPermission = (data: any) =>
  Promise.resolve(instance.post(API.BATCH_PERMISSION, data));

export const reqGetPermission = (data: any) =>
  Promise.resolve(
    instance.get(API.GET_PERMISSION, {
      params: data,
    })
  );
