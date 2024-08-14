import instance from "@/utils/request";
import { PagainationType } from "@/types";

// 学员相关接口的枚举类型
enum API {
  STUDENT_LIST = "/permission/roleList",
  ADD_STUDENT = "/permission/saveRole",
  DEL_STUDENT = "/permission/delRole",
}

// 获取学员列表数据接口
export const reqStudentList = (data: PagainationType) =>
  Promise.resolve(
    instance.post<typeof data, Response.StudentListRes>(API.STUDENT_LIST, data)
  );

// 保存学员数据接口
export const reqSaveStudent = (data: RequestData.SaveStudentParam) =>
  Promise.resolve(
    instance.post<typeof data, Response.SaveStudentRes>(API.ADD_STUDENT, data)
  );

// 删除学员数据接口
export const reqDelStudent = (data: RequestData.DelStudentParam) =>
  Promise.resolve(
    instance.post<typeof data, Response.DelStudentRes>(API.DEL_STUDENT, data)
  );
