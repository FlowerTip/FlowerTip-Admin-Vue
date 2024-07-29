import Mock from "mockjs";

// 上传图片接口
export default [
  // 获取用户信息
  {
    url: "/api/upload/avatar",
    method: "post",
    response: (request: any) => {
      //获取请求头携带token
      const token = request.headers["token"];
      if (!token)
        return { code: 201, data: { message: "无操作权限，请重新登录" } };
      const file = request.body.file;
      //没有返回失败的信息
      if (!file) return { code: 201, data: { message: "上传头像失败" } };
      //如果有返回成功信息
      return {
        code: 200,
        data: { url: Mock.mock("@image"), message: "上传头像成功" },
      };
    },
  },
];
