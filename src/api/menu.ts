import instance from "@/utils/request";
import { PagainationType } from "@/types";

// 定义一个接口的枚举类型
enum API {
  MENU_LIST = "/menu/menuList",

  ADD_MENU__INFO = "/menu/saveMenu",

  DEL_MENU__INFO = "/menu/delMenu",
}

export const reqTableList = (data: PagainationType) =>
  Promise.resolve(instance.post(API.MENU_LIST, data));

export const reqSaveTable = (data: any) =>
  Promise.resolve(instance.post(API.ADD_MENU__INFO, data));

export const reqDelTable = (data: any) =>
  Promise.resolve(instance.post<any, any>(API.DEL_MENU__INFO, data));
