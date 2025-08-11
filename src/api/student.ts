import instance from "@/utils/service";
import { PagainationType } from "@/types";

// 获取学员列表数据接口
export const reqStudentList = (data: PagainationType) =>
  instance.get<Res.StudentListData>("/student", data);

// 保存学员数据接口
export const reqSaveStudent = (data: Req.SaveStudentParam) =>
  instance.post<Res.SaveStudentData>("/student", data);

export const reqUpdateStudent = (data: Req.SaveStudentParam, id?: number) =>
  instance.patch<Res.SaveStudentData>("/student/" + id, data);

// 删除学员数据接口
export const reqDelStudent = (id: number) =>
  instance.delete<Res.DelStudentData>("/student/" + id);

// 批量删除学员数据接口
export const reqBatchDelStudent = (data: Req.DelStudentParam) =>
  instance.delete<Res.DelStudentData>("/student/batch", data);
