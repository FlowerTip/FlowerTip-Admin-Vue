import instance from "@/utils/service";

// 部门相关接口的枚举类型
enum API {
  WORK_POST_LIST = "/workPost",
  ADD_WORK_POST = "/workPost/saveWorkPost",
  DELETE_WORK_POST = "/workPost/delWorkPost",
  WORKPOST = "/workPost",
}

// 获取岗位列表接口数据
export const reqWorkPostList = (data: Req.WorkPostListParam) =>
  instance.get<Res.WorkPostListData>(API.WORKPOST, data);

// 获取岗位列表接口数据
export const reqAllWorkPostList = () =>
  instance.get<Res.WorkPostListData>(API.WORKPOST + "/all");

// 保存岗位信息数据接口
export const reqSaveWorkPost = (data: WorkPostItem) => {
  if (data.workPostId) {
    const editId = data.workPostId;
    delete data.workPostId; // 删除id字段，避免传递到后端
    return instance.patch<Res.SaveWorkPostRes>(
      API.WORKPOST + "/" + editId,
      data
    );
  } else {
    return instance.post<Res.SaveWorkPostRes>(API.WORKPOST, data);
  }
};

// 删除岗位信息数据接口
export const reqDelWorkPost = (id: number) =>
  instance.delete<Res.DelWorkPostRes>(API.WORKPOST + "/" + id);
