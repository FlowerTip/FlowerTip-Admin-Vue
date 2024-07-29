import { RouteComponent } from "vue-router";

function createPermissionList() {
  return [
    {
      path: "/cockpit",
      name: "cockpit",
      component: "cockpit/index",
      meta: {
        title: "驾驶舱",
        icon: "",
        hidden: false,
      },
    },
    {
      path: "/general",
      name: "general",
      component: "layout",
      meta: {
        title: "常用组件",
        icon: "",
        hidden: false,
      },
      redirect: "/general/advanced-table",
      children: [
        {
          path: "advanced-table",
          name: "advanced-table",
          component: "general/advanced-table/index",
          meta: {
            title: "高级表格",
            icon: "",
            hidden: false,
          },
        },
        {
          path: "search-form",
          name: "search-form",
          component: "general/search-form/index",
          meta: {
            title: "查询表单",
            icon: "",
            hidden: false,
          },
        },
      ],
    },
    {
      path: "/juejin",
      name: "juejin",
      meta: {
        title: "稀土掘金",
        icon: "ele-Menu",
        hidden: false,
      },
      component: "layout",
      redirect: "https://juejin.cn/user/2295436009546920/posts",
      children: [
        {
          path: "https://juejin.cn/user/2295436009546920/posts",
          meta: { title: "稀土掘金", icon: "ele-Menu", hidden: false },
        },
      ],
    },
    {
      path: "/setting",
      name: "setting",
      component: "layout",
      meta: {
        title: "系统管理",
        icon: "",
        hidden: false,
      },
      redirect: "/setting/permission",
      children: [
        {
          path: "permission",
          name: "permission",
          component: "setting/permission/index",
          meta: {
            title: "权限管理",
            icon: "",
            hidden: false,
          },
          redirect: "/setting/permission/menu",
          children: [
            {
              path: "menu",
              name: "menu",
              component: "setting/permission/menu/index",
              meta: {
                title: "菜单管理",
                icon: "",
                hidden: false,
              },
            },
            {
              path: "user",
              name: "user",
              component: "setting/permission/user/index",
              meta: {
                title: "用户管理",
                icon: "",
                hidden: false,
              },
            },
          ],
        },
        {
          path: "department",
          name: "department",
          component: "setting/department/index",
          meta: {
            title: "部门管理",
            icon: "",
            hidden: false,
          },
          children: [
            {
              path: "software",
              name: "software",
              component: "setting/department/software/index",
              meta: {
                title: "软件部门",
                icon: "",
                hidden: false,
              },
            },
            {
              path: "maintenance",
              name: "maintenance",
              component: "setting/department/maintenance/index",
              meta: {
                title: "运维部门",
                icon: "",
                hidden: false,
              },
            },
          ],
        },
      ],
    },
  ];
}

//对外暴露一个数组:数组里面包含两个接口
//登录假的接口
//获取用户信息的假的接口
export default [
  // 获取用户信息
  {
    url: "/api/permission/menus",
    method: "get",
    response: (request: any) => {
      let list: RouteComponent[] = createPermissionList();
      //获取请求头携带token
      const username = request.query.username;
      //没有返回失败的信息
      if (!username)
        return { code: 201, data: { message: "获取权限菜单失败" } };
      //如果有返回成功信息
      return { code: 200, data: { list } };
    },
  },
];
