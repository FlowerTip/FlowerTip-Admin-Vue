import Mock from "mockjs";
import { dayjs } from "element-plus";

// 分页获取表格数据
const list: any = [];
for (let i = 1; i <= 100; i++) {
  list.push(
    Mock.mock({
      id: "@id",
      username: "@cname()",
      "age|1-100": 18,
      big: 1,
      sex: 1,
      color: "@color",
      hobby: "喜欢@ctitle",
      address: "@province@city@county",
      school: "@province()第一大学",
      time: "@datetime",
      bigLabel: "大",
      sexLabel: "男",
    })
  );
}

export default [
  // 获取角色列表
  {
    url: "/api/permission/roleList",
    method: "post",
    response: (request: any): any => {
      const token = request.headers["token"];
      if (!token) return { code: 201, data: { message: "获取数据失败" } };
      let returnData = [];
      let newList: any = [];
      let total = 0;
      const { currentPage, pageSize, username, big, sex, address, time } =
        request.body;
      if (list.length > 0) {
        const count = (currentPage - 1) * pageSize;
        const sliceCount = currentPage * pageSize;
        const data = list.slice(count, sliceCount);
        if (
          username &&
          big != undefined &&
          sex != undefined &&
          address &&
          time
        ) {
          const findObj = data.find((item: any) => {
            return (
              item.username.indexOf(username) != -1 &&
              item.big == big &&
              item.sex == sex &&
              item.address == address &&
              item.time == time
            );
          });
          findObj && newList.push(findObj);
        } else if (
          username &&
          big != undefined &&
          sex != undefined &&
          address
        ) {
          const findObj = data.find((item: any) => {
            return (
              item.username.indexOf(username) != -1 &&
              item.big == big &&
              item.sex == sex &&
              item.address == address
            );
          });
          findObj && newList.push(findObj);
        } else if (username && big != undefined && sex != undefined) {
          const findObj = data.find((item: any) => {
            return (
              item.username.indexOf(username) != -1 &&
              item.big == big &&
              item.sex == sex
            );
          });
          findObj && newList.push(findObj);
        } else if (username && big != undefined) {
          const findObj = data.find((item: any) => {
            return item.username.indexOf(username) != -1 && item.big == big;
          });
          findObj && newList.push(findObj);
        } else if (username) {
          const findObj = data.find((item: any) => {
            return item.username.indexOf(username) != -1;
          });
          findObj && newList.push(findObj);
        } else {
          newList = data;
        }
        total = list.length;
        returnData = newList;
      } else {
        total = list.length;
        returnData = list;
      }
      //如果有返回成功信息
      return { code: 200, data: { list: returnData, total } };
    },
  },
  // 保存角色信息
  {
    url: "/api/permission/saveRole",
    method: "post",
    response: (request: any): any => {
      const token = request.headers["token"];
      if (!token) return { code: 201, data: { message: "保存数据失败" } };
      const { id, time } = request.body;
      // 有id是编辑，没id是添加
      if (id) {
        const spliceIndex = list.findIndex((item: any) => item.id === id);
        spliceIndex !== -1 && list.splice(spliceIndex, 1);
        list.push({
          ...request.body,
          time: dayjs(time).format("YYYY-MM-DD HH:mm:ss"),
        });
      } else {
        list.push({
          ...request.body,
          time: dayjs(time).format("YYYY-MM-DD HH:mm:ss"),
          id: Mock.Random.id(),
        });
      }
      return { code: 200, data: { message: "保存数据成功" } };
    },
  },
  // 删除角色信息
  {
    url: "/api/permission/delRole",
    method: "post",
    response: (request: any): any => {
      const token = request.headers["token"];
      if (!token) return { code: 201, data: { message: "数据删除失败" } };
      let delDoned = false;
      const { ids } = request.body;
      ids.forEach((id: string | number) => {
        const delIndex = list.findIndex((item: any) => item.id == id);
        if (delIndex != -1) {
          list.splice(delIndex, 1);
          delDoned = true;
        } else {
          delDoned = false;
        }
      });
      if (delDoned) {
        return { code: 200, data: { message: "数据删除成功" } };
      } else {
        return { code: 200, data: { message: "数据删除失败" } };
      }
    },
  },
];
