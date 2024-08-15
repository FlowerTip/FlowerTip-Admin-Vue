import instance from "@/utils/service";

// 菜单相关接口的枚举类型
enum API {
  MENU_LIST = "/menu/menuList",
  ADD_MENU__INFO = "/menu/saveMenu",
  DEL_MENU__INFO = "/menu/delMenu",
}

// 获取菜单列表接口数据
export const reqMenuList = (data: Req.MenuListParam) =>
  instance.post<Res.MenuListData>(API.MENU_LIST, data);

// 保存菜单接口数据
export const reqSaveMenu = (data: Req.SaveMenuParam) =>
  instance.post<unknown>(API.ADD_MENU__INFO, data);

// 删除菜单接口数据
export const reqDelMenu = (data: Req.DelMenuParam) =>
  instance.post<unknown>(API.DEL_MENU__INFO, data);
