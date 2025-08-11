import instance from "@/utils/service";

// 部门相关接口的枚举类型
enum API {
  DEPART_MENT_LIST = "/department",
  ADD_DEPART_MENT__INFO = "/department/saveDepartment",
  DELETE_DEPART_MENT = "/department/delDepartment",
  DEPARTMENT = "/department",
}

// 获取部门列表接口数据
export const reqDepartmentList = (data: Req.DepartMentListParam) =>
  instance.get<Res.DepartMentListData>(API.DEPARTMENT, data);

// 保存部门信息数据接口
export const reqSaveDepartment = (data: DepartMentItem) => {
  if (data.departmentId) {
    const editId = data.departmentId;
    delete data.departmentId; // 删除id字段，避免传递到后端
    return instance.patch<Res.SaveDepartMentRes>(
      API.DEPART_MENT_LIST + "/" + editId,
      data
    );
  } else {
    return instance.post<Res.SaveDepartMentRes>(API.DEPART_MENT_LIST, data);
  }
};

export const reqDelDepartMent = (id: number) =>
  instance.delete<Res.DelRoleData>(API.DEPARTMENT + "/" + id);
