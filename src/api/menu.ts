import instance from "@/utils/service";

// 菜单相关接口的枚举类型
enum API {
  MENU_LIST = "/menus",
}

// 获取菜单列表接口数据
export const reqMenuList = (data: Req.MenuListParam) =>
  instance.get<Res.MenuListData>(API.MENU_LIST, data);
