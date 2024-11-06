import zh from "@/language/modules/zh";
import en from "@/language/modules/en";
const lang = navigator.language === "en" ? en : zh;
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
      title: lang.menu.login,
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
      title: lang.menu.cockpit,
      icon: "ele-Stopwatch",
    },
    children: [
      {
        path: "cockpit",
        name: "cockpit",
        component: () => import("@/views/cockpit/index.vue"),
        meta: {
          title: lang.menu.cockpit,
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
      title: lang.menu.table,
      icon: "ele-Grid",
    },
    redirect: "/table/advanced-table",
    children: [
      {
        name: "advanced-table",
        path: "advanced-table",
        component: () => import("@/views/table/advanced-table/index.vue"),
        meta: {
          title: lang.menu.advancedTable,
          icon: "ele-Film",
        },
      },
      {
        name: "dialog-table",
        path: "dialog-table",
        component: () => import("@/views/table/dialog-table/index.vue"),
        meta: {
          title: lang.menu.dialogTable,
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
      title: lang.menu.upload,
      icon: "ele-UploadFilled",
    },
    redirect: "/upload/avatar-upload",
    children: [
      {
        name: "avatar-upload",
        path: "avatar-upload",
        component: () => import("@/views/upload/avatar-upload/index.vue"),
        meta: {
          title: lang.menu.avatarUpload,
          icon: "ele-Avatar",
        },
      },
      {
        name: "image-upload",
        path: "image-upload",
        component: () => import("@/views/upload/image-upload/index.vue"),
        meta: {
          title: lang.menu.imageUpload,
          icon: "ele-PictureFilled",
        },
      },
      {
        name: "file-upload",
        path: "file-upload",
        component: () => import("@/views/upload/file-upload/index.vue"),
        meta: {
          title: lang.menu.fileUpload,
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
      title: lang.menu.form,
      icon: "ele-EditPen",
    },
    redirect: "/form/basic-form",
    children: [
      {
        name: "basic-form",
        path: "basic-form",
        component: () => import("@/views/form/basic-form/index.vue"),
        meta: {
          title: lang.menu.basicForm,
          icon: "ele-Tickets",
        },
      },
      {
        name: "step-form",
        path: "step-form",
        component: () => import("@/views/form/step-form/index.vue"),
        meta: {
          title: lang.menu.stepForm,
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
      title: lang.menu.chart,
      icon: "ele-TrendCharts",
    },
    redirect: "/chart/pie-chart",
    children: [
      {
        name: "pie-chart",
        path: "pie-chart",
        component: () => import("@/views/chart/pie/index.vue"),
        meta: {
          title: lang.menu.pieChart,
          icon: "ele-PieChart",
        },
      },
      {
        name: "bar-chart",
        path: "bar-chart",
        component: () => import("@/views/chart/bar/index.vue"),
        meta: {
          title: lang.menu.barChart,
          icon: "ele-Histogram",
        },
      },
      {
        name: "line-chart",
        path: "line-chart",
        component: () => import("@/views/chart/line/index.vue"),
        meta: {
          title: lang.menu.lineChart,
          icon: "ele-TrendCharts",
        },
      },
      {
        name: "map-chart",
        path: "map-chart",
        component: () => import("@/views/chart/map/index.vue"),
        meta: {
          title: lang.menu.mapChart,
          icon: "ele-WindPower",
        },
      },
      {
        name: "mix-chart",
        path: "mix-chart",
        component: () => import("@/views/chart/mix/index.vue"),
        meta: {
          title: lang.menu.mixChart,
          icon: "ele-Football",
        },
      },
      {
        name: "moreLine-chart",
        path: "moreLine-chart",
        component: () => import("@/views/chart/moreLine/index.vue"),
        meta: {
          title: lang.menu.moreLineChart,
          icon: "ele-Collection",
        },
      },
      {
        name: "moreBar-chart",
        path: "moreBar-chart",
        component: () => import("@/views/chart/moreBar/index.vue"),
        meta: {
          title: lang.menu.moreBarChart,
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
      title: lang.menu.tool,
      icon: "ele-Menu",
    },
    redirect: "/tool/dayjs-tool",
    children: [
      {
        name: "dayjs-tool",
        path: "dayjs-tool",
        component: () => import("@/views/tool/dayjs/index.vue"),
        meta: {
          title: lang.menu.dayjsTool,
          icon: "ele-Calendar",
        },
      },
      {
        name: "throttle-tool",
        path: "throttle-tool",
        component: () => import("@/views/tool/throttle/index.vue"),
        meta: {
          title: lang.menu.throttleTool,
          icon: "ele-Timer",
        },
      },
      {
        name: "preview-file",
        path: "preview-file",
        component: () => import("@/views/tool/preview/index.vue"),
        meta: {
          title: lang.menu.previewFile,
          icon: "ele-Printer",
        },
      },
      {
        name: "test",
        path: "test",
        component: () => import("@/views/form/test/index.vue"),
        meta: {
          title: lang.menu.levelMenu,
          icon: "ele-Reading",
        },
        redirect: "/tool/test/list",
        children: [
          {
            name: "list",
            path: "list",
            component: () => import("@/views/form/test/list/index.vue"),
            meta: {
              title: lang.menu.menu1,
              icon: "ele-Reading",
              parentName: "test",
            },
          },
          {
            name: "detail",
            path: "detail",
            component: () => import("@/views/form/test/detail/index.vue"),
            meta: {
              title: lang.menu.menu2,
              icon: "ele-Reading",
              parentName: "test",
            },
          },
          {
            name: "demo",
            path: "demo",
            component: () => import("@/views/form/test/demo/index.vue"),
            meta: {
              title: lang.menu.menu3,
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
                  title: lang.menu.menu31,
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
                  title: lang.menu.menu32,
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
          title: lang.menu.errorPage,
          icon: "ele-DocumentDelete",
        },
        redirect: "/tool/error-page/404",
        children: [
          {
            name: "404",
            path: "404",
            component: () => import("@/views/error-page/404.vue"),
            meta: {
              title: lang.menu.notFound,
              icon: "ele-DocumentDelete",
              parentName: "error-page",
            },
          },
          {
            name: "403",
            path: "403",
            component: () => import("@/views/error-page/403.vue"),
            meta: {
              title: lang.menu.notPermission,
              icon: "ele-DocumentDelete",
              parentName: "error-page",
            },
          },
          {
            name: "500",
            path: "500",
            component: () => import("@/views/error-page/500.vue"),
            meta: {
              title: lang.menu.notNetwork,
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
      title: lang.menu.online,
      icon: "ele-Link",
      hidden: false,
    },
    component: () => import("@/layout/index.vue"),
    redirect: "https://juejin.cn/column/7388686221892976703",
    children: [
      {
        path: "https://juejin.cn/column/7388686221892976703",
        name: "vitepress-blog",
        meta: { title: lang.menu.online, icon: "ele-Link", hidden: false },
      },
    ],
  },
  {
    path: "/project",
    name: "project",
    meta: {
      title: lang.menu.project,
      icon: "ele-HelpFilled",
      hidden: false,
    },
    component: () => import("@/layout/index.vue"),
    redirect: "https://gitee.com/CodeTV",
    children: [
      {
        path: "https://gitee.com/CodeTV",
        name: "CodeTV",
        meta: {
          title: lang.menu.project,
          icon: "ele-HelpFilled",
          hidden: false,
        },
      },
    ],
  },
  {
    name: "setting",
    path: "/setting",
    component: () => import("@/layout/index.vue"),
    redirect: "/setting/permission",
    meta: { title: lang.menu.system, icon: "ele-Setting" },
    children: [
      {
        name: "permission",
        path: "/setting/permission",
        component: () => import("@/views/setting/permission/index.vue"),
        meta: { title: lang.menu.permission, icon: "ele-UserFilled" },
        redirect: "/setting/permission/menu",
        children: [
          {
            name: "menu",
            path: "menu",
            component: () =>
              import("@/views/setting/permission/menu/index.vue"),
            meta: {
              title: lang.menu.menu,
              icon: "ele-Menu",
            },
          },
          {
            name: "role",
            path: "role",
            component: () =>
              import("@/views/setting/permission/role/index.vue"),
            meta: {
              title: lang.menu.role,
              icon: "ele-Promotion",
            },
          },
          {
            name: "user",
            path: "user",
            component: () =>
              import("@/views/setting/permission/user/index.vue"),
            meta: {
              title: lang.menu.user,
              icon: "ele-Avatar",
            },
          },
        ],
      },
      {
        name: "department",
        path: "/setting/department",
        component: () => import("@/views/setting/department/index.vue"),
        meta: { title: lang.menu.department, icon: "ele-Postcard" },
        redirect: "/setting/department/software",
        children: [
          {
            name: "software",
            path: "software",
            component: () =>
              import("@/views/setting/department/software/index.vue"),
            meta: {
              title: lang.menu.software,
              icon: "ele-Management",
            },
          },
          {
            name: "maintenance",
            path: "maintenance",
            component: () =>
              import("@/views/setting/department/maintenance/index.vue"),
            meta: {
              title: lang.menu.maintenance,
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
