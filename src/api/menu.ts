import instance from "@/utils/request";

// 菜单相关接口的枚举类型
enum API {
  MENU_LIST = "/menu/menuList",
  ADD_MENU__INFO = "/menu/saveMenu",
  DEL_MENU__INFO = "/menu/delMenu",
}

// 获取菜单列表接口数据
export const reqMenuList = (data: RequestData.MenuListParam) =>
  Promise.resolve(
    instance.post<any, Response.MenuListRes>(API.MENU_LIST, data)
  );

// 保存菜单接口数据
export const reqSaveMenu = (data: RequestData.SaveMenuParam) =>
  Promise.resolve(instance.post(API.ADD_MENU__INFO, data));

// 删除菜单接口数据
export const reqDelMenu = (data: RequestData.DelMenuParam) =>
  Promise.resolve(instance.post<any, any>(API.DEL_MENU__INFO, data));
