/**
 * 路由meta对象参数说明
 * meta: {
 *      title:          菜单与面包屑的标题
 *      hidden：        是否隐藏菜单此路由
 *      icon：          菜单标题左侧的图标
 *      parentName:     父级菜单的路由路径
 * }
 */
// 目前模版项目中的全部的路由
// login登录   一级路由
// 404页面     一级路由
// 任意路由    一级路由重定向404

// 根路由      一级路由(layout/index.vue)
export const staticRoutes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true,
      title: "登录",
    },
  },
  {
    path: "/403",
    name: "403",
    component: () => import("@/views/error-page/403.vue"),
    meta: {
      hidden: true,
      title: "403",
    },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true,
      title: "404",
    },
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/views/error-page/500.vue"),
    meta: {
      hidden: true,
      title: "500",
    },
  },
];

// 异步路由
export const asyncRoute = [
  {
    path: "/home",
    name: "home",
    component: () => import("@/layout/index.vue"),
    redirect: "/home/cockpit",
    meta: {
      title: "驾驶舱",
      icon: "ele-Stopwatch",
    },
    children: [
      {
        path: "cockpit",
        name: "cockpit",
        component: () => import("@/views/cockpit/index.vue"),
        meta: {
          title: "驾驶舱",
          icon: "ele-Stopwatch",
        },
      },
    ],
  },
  {
    path: "/table",
    component: () => import("@/layout/index.vue"),
    name: "table",
    meta: {
      title: "表格组件",
      icon: "ele-Grid",
    },
    redirect: "/table/advanced-table",
    children: [
      {
        name: "advanced-table",
        path: "advanced-table",
        component: () => import("@/views/table/advanced-table/index.vue"),
        meta: {
          title: "高级表格",
          icon: "ele-Film",
        },
      },
      {
        name: "dialog-table",
        path: "dialog-table",
        component: () => import("@/views/table/dialog-table/index.vue"),
        meta: {
          title: "表格筛选",
          icon: "ele-Postcard",
        },
      },
    ],
  },
  {
    path: "/upload",
    component: () => import("@/layout/index.vue"),
    name: "upload",
    meta: {
      title: "上传组件",
      icon: "ele-UploadFilled",
    },
    redirect: "/upload/avatar-upload",
    children: [
      {
        name: "avatar-upload",
        path: "avatar-upload",
        component: () => import("@/views/upload/avatar-upload/index.vue"),
        meta: {
          title: "头像上传",
          icon: "ele-Avatar",
        },
      },
      {
        name: "image-upload",
        path: "image-upload",
        component: () => import("@/views/upload/image-upload/index.vue"),
        meta: {
          title: "图片上传",
          icon: "ele-PictureFilled",
        },
      },
      {
        name: "file-upload",
        path: "file-upload",
        component: () => import("@/views/upload/file-upload/index.vue"),
        meta: {
          title: "文件上传",
          icon: "ele-Files",
        },
      },
    ],
  },
  {
    path: "/form",
    component: () => import("@/layout/index.vue"),
    name: "form",
    meta: {
      title: "表单组件",
      icon: "ele-EditPen",
    },
    redirect: "/form/basic-form",
    children: [
      {
        name: "basic-form",
        path: "basic-form",
        component: () => import("@/views/form/basic-form/index.vue"),
        meta: {
          title: "基础表单",
          icon: "ele-Tickets",
        },
      },
      {
        name: "step-form",
        path: "step-form",
        component: () => import("@/views/form/step-form/index.vue"),
        meta: {
          title: "分步表单",
          icon: "ele-Reading",
        },
      },
    ],
  },
  {
    path: "/chart",
    component: () => import("@/layout/index.vue"),
    name: "chart",
    meta: {
      title: "图表组件",
      icon: "ele-TrendCharts",
    },
    redirect: "/chart/pie-chart",
    children: [
      {
        name: "pie-chart",
        path: "pie-chart",
        component: () => import("@/views/chart/pie/index.vue"),
        meta: {
          title: "饼图图表",
          icon: "ele-PieChart",
        },
      },
      {
        name: "bar-chart",
        path: "bar-chart",
        component: () => import("@/views/chart/bar/index.vue"),
        meta: {
          title: "柱状图表",
          icon: "ele-Histogram",
        },
      },
      {
        name: "line-chart",
        path: "line-chart",
        component: () => import("@/views/chart/line/index.vue"),
        meta: {
          title: "折线图表",
          icon: "ele-TrendCharts",
        },
      },
      {
        name: "map-chart",
        path: "map-chart",
        component: () => import("@/views/chart/map/index.vue"),
        meta: {
          title: "地图图表",
          icon: "ele-WindPower",
        },
      },
      {
        name: "mix-chart",
        path: "mix-chart",
        component: () => import("@/views/chart/mix/index.vue"),
        meta: {
          title: "混合图表",
          icon: "ele-Football",
        },
      },
      {
        name: "moreLine-chart",
        path: "moreLine-chart",
        component: () => import("@/views/chart/moreLine/index.vue"),
        meta: {
          title: "多折线图表",
          icon: "ele-Collection",
        },
      },
      {
        name: "moreBar-chart",
        path: "moreBar-chart",
        component: () => import("@/views/chart/moreBar/index.vue"),
        meta: {
          title: "多柱状图表",
          icon: "ele-DataBoard",
        },
      },
    ],
  },
  {
    path: "/tool",
    component: () => import("@/layout/index.vue"),
    name: "tool",
    meta: {
      title: "常用功能",
      icon: "ele-Menu",
    },
    redirect: "/tool/dayjs-tool",
    children: [
      {
        name: "dayjs-tool",
        path: "dayjs-tool",
        component: () => import("@/views/tool/dayjs/index.vue"),
        meta: {
          title: "时间操作",
          icon: "ele-Calendar",
        },
      },
      {
        name: "throttle-tool",
        path: "throttle-tool",
        component: () => import("@/views/tool/throttle/index.vue"),
        meta: {
          title: "防抖节流",
          icon: "ele-Timer",
        },
      },
      {
        name: "preview-file",
        path: "preview-file",
        component: () => import("@/views/tool/preview/index.vue"),
        meta: {
          title: "文档预览",
          icon: "ele-Printer",
        },
      },
      {
        name: "test",
        path: "test",
        component: () => import("@/views/form/test/index.vue"),
        meta: {
          title: "多级菜单",
          icon: "ele-Reading",
        },
        redirect: "/tool/test/list",
        children: [
          {
            name: "list",
            path: "list",
            component: () => import("@/views/form/test/list/index.vue"),
            meta: {
              title: "菜单1",
              icon: "ele-Reading",
              parentName: "test",
            },
          },
          {
            name: "detail",
            path: "detail",
            component: () => import("@/views/form/test/detail/index.vue"),
            meta: {
              title: "菜单2",
              icon: "ele-Reading",
              parentName: "test",
            },
          },
          {
            name: "demo",
            path: "demo",
            component: () => import("@/views/form/test/demo/index.vue"),
            meta: {
              title: "菜单3",
              icon: "ele-Reading",
              parentName: "test",
            },
            children: [
              {
                name: "demo1",
                path: "demo1",
                component: () =>
                  import("@/views/form/test/demo/demo01/index.vue"),
                meta: {
                  title: "菜单3-1",
                  icon: "ele-Reading",
                  parentName: "test/demo",
                },
              },
              {
                name: "demo2",
                path: "demo2",
                component: () =>
                  import("@/views/form/test/demo/demo02/index.vue"),
                meta: {
                  title: "菜单3-2",
                  icon: "ele-Reading",
                  parentName: "test/demo",
                },
              },
            ],
          },
        ],
      },
      {
        name: "error-page",
        path: "error-page",
        component: () => import("@/views/error-page/index.vue"),
        meta: {
          title: "错误页面",
          icon: "ele-DocumentDelete",
        },
        redirect: "/tool/error-page/404",
        children: [
          {
            name: "404",
            path: "404",
            component: () => import("@/views/error-page/404.vue"),
            meta: {
              title: "404页面",
              icon: "ele-DocumentDelete",
              parentName: "error-page",
            },
          },
          {
            name: "403",
            path: "403",
            component: () => import("@/views/error-page/403.vue"),
            meta: {
              title: "403页面",
              icon: "ele-DocumentDelete",
              parentName: "error-page",
            },
          },
          {
            name: "500",
            path: "500",
            component: () => import("@/views/error-page/500.vue"),
            meta: {
              title: "500页面",
              icon: "ele-DocumentDelete",
              parentName: "error-page",
            },
          },
        ],
      },
    ],
  },
  {
    path: "/document",
    name: "document",
    meta: {
      title: "在线文档",
      icon: "ele-Link",
      hidden: false,
    },
    component: () => import("@/layout/index.vue"),
    redirect: "https://juejin.cn/column/7388686221892976703",
    children: [
      {
        path: "https://juejin.cn/column/7388686221892976703",
        name: "vitepress-blog",
        meta: { title: "在线文档", icon: "ele-Link", hidden: false },
      },
    ],
  },
  {
    path: "/project",
    name: "project",
    meta: {
      title: "开源项目",
      icon: "ele-HelpFilled",
      hidden: false,
    },
    component: () => import("@/layout/index.vue"),
    redirect: "https://gitee.com/CodeTV",
    children: [
      {
        path: "https://gitee.com/CodeTV",
        name: "CodeTV",
        meta: { title: "开源项目", icon: "ele-HelpFilled", hidden: false },
      },
    ],
  },
  {
    name: "setting",
    path: "/setting",
    component: () => import("@/layout/index.vue"),
    redirect: "/setting/permission",
    meta: { title: "系统管理", icon: "ele-Setting" },
    children: [
      {
        name: "permission",
        path: "/setting/permission",
        component: () => import("@/views/setting/permission/index.vue"),
        meta: { title: "权限管理", icon: "ele-UserFilled" },
        redirect: "/setting/permission/menu",
        children: [
          {
            name: "menu",
            path: "menu",
            component: () =>
              import("@/views/setting/permission/menu/index.vue"),
            meta: {
              title: "菜单管理",
              icon: "ele-Menu",
            },
          },
          {
            name: "role",
            path: "role",
            component: () =>
              import("@/views/setting/permission/role/index.vue"),
            meta: {
              title: "角色管理",
              icon: "ele-Promotion",
            },
          },
          {
            name: "user",
            path: "user",
            component: () =>
              import("@/views/setting/permission/user/index.vue"),
            meta: {
              title: "用户管理",
              icon: "ele-Avatar",
            },
          },
        ],
      },
      {
        name: "department",
        path: "/setting/department",
        component: () => import("@/views/setting/department/index.vue"),
        meta: { title: "部门管理", icon: "ele-Postcard" },
        redirect: "/setting/department/software",
        children: [
          {
            name: "software",
            path: "software",
            component: () =>
              import("@/views/setting/department/software/index.vue"),
            meta: {
              title: "软件人员",
              icon: "ele-Management",
            },
          },
          {
            name: "maintenance",
            path: "maintenance",
            component: () =>
              import("@/views/setting/department/maintenance/index.vue"),
            meta: {
              title: "运维人员",
              icon: "ele-VideoCamera",
            },
          },
        ],
      },
    ],
  },
];

// 任意路由
export const anyRoute = {
  path: "/:pathMatch(.*)",
  name: "Any",
  component: () => import("@/views/error-page/404.vue"),
  meta: {
    hidden: true,
    title: "404页面",
  },
};
