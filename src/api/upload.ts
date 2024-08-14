import instance from "@/utils/request";
import { getToken } from "@/utils/auth";

// 文件上传相关接口的枚举类型
enum API {
  UPLOAD_AVATAR = "/upload/avatar",
}

// 上传学员头像数据接口
export const reqUploadAvatar = (data: FormData) =>
  Promise.resolve(
    instance.post<typeof data, Response.UploadAvatarRes>(
      API.UPLOAD_AVATAR,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
  );
