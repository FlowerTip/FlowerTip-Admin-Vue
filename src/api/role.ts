import instance from "@/utils/service";
import { PagainationType } from "@/types";

// 角色相关接口的枚举类型
enum API {
  ROLE = "/role",
}

// 获取角色列表数据接口
export const reqRoleList = (data: PagainationType) =>
  instance.get<Res.AllRoleListData<RoleItem>>(API.ROLE, data);

export const reqAllRoleList = () =>
  instance.get<Res.AllRoleListData<RoleItem>>(API.ROLE + "/all");

// 保存角色信息数据接口
export const reqSaveRole = (data: RoleItem) => {
  if (data.id) {
    const editId = data.id;
    delete data.id; // 删除id字段，避免传递到后端
    return instance.patch<Res.SaveRoleData>(API.ROLE + "/" + editId, data);
  } else {
    return instance.post<Res.SaveRoleData>(API.ROLE, data);
  }
};

// 删除角色信息数据接口
export const reqDelRole = (id: number) =>
  instance.delete<Res.DelRoleData>(API.ROLE + "/" + id);

// 角色绑定权限菜单接口
export const reqBatchPermission = (id: number, data: Req.BatchPermissionData) =>
  instance.post<Res.BatchPermissionData>(API.ROLE + "/" + id + "/menus", data);

// 获取操作的角色绑定的权限菜单数据接口
export const reqGetPermission = (id: number) =>
  instance.get<Res.GetPermissionData>(API.ROLE + "/" + id);
