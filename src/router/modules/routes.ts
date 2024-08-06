import type { RouteRecordRaw } from "vue-router";
/**
 * 路由meta对象参数说明
 * meta: {
 *      title:          菜单与面包屑的标题
 *      hidden：        是否隐藏菜单此路由
 *      icon：          菜单标题左侧的图标
 * }
 */
// 目前模版项目中的全部的路由
// login登录   一级路由
// 404页面     一级路由
// 任意路由    一级路由重定向404
// 根路由      一级路由(layout/index.vue)
export const staticRoutes: RouteRecordRaw[] = [
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
      icon: "ele-Menu",
    },
    children: [
      {
        path: "cockpit",
        name: "cockpit",
        component: () => import("@/views/cockpit/index.vue"),
        meta: {
          title: "驾驶舱",
          icon: "ele-Menu",
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
      icon: "ele-Menu",
    },
    redirect: "/table/advanced-table",
    children: [
      {
        name: "advanced-table",
        path: "advanced-table",
        component: () => import("@/views/table/advanced-table/index.vue"),
        meta: {
          title: "高级表格",
          icon: "ele-Menu",
        },
      },
      {
        name: "dialog-table",
        path: "dialog-table",
        component: () => import("@/views/table/dialog-table/index.vue"),
        meta: {
          title: "表格筛选",
          icon: "ele-Menu",
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
      icon: "ele-Menu",
    },
    redirect: "/upload/avatar-upload",
    children: [
      {
        name: "avatar-upload",
        path: "avatar-upload",
        component: () => import("@/views/upload/avatar-upload/index.vue"),
        meta: {
          title: "头像上传",
          icon: "ele-Menu",
        },
      },
      {
        name: "image-upload",
        path: "image-upload",
        component: () => import("@/views/upload/image-upload/index.vue"),
        meta: {
          title: "图片上传",
          icon: "ele-Menu",
        },
      },
      {
        name: "file-upload",
        path: "file-upload",
        component: () => import("@/views/upload/file-upload/index.vue"),
        meta: {
          title: "文件上传",
          icon: "ele-Menu",
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
      icon: "ele-Menu",
    },
    redirect: "/form/basic-form",
    children: [
      {
        name: "basic-form",
        path: "basic-form",
        component: () => import("@/views/form/basic-form/index.vue"),
        meta: {
          title: "基础表单",
          icon: "ele-Menu",
        },
      },
      {
        name: "step-form",
        path: "step-form",
        component: () => import("@/views/form/step-form/index.vue"),
        meta: {
          title: "分步表单",
          icon: "ele-Menu",
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
      icon: "ele-Menu",
    },
    redirect: "/chart/pie-chart",
    children: [
      {
        name: "pie-chart",
        path: "pie-chart",
        component: () => import("@/views/chart/pie/index.vue"),
        meta: {
          title: "饼图图表",
          icon: "ele-Menu",
        },
      },
      {
        name: "bar-chart",
        path: "bar-chart",
        component: () => import("@/views/chart/bar/index.vue"),
        meta: {
          title: "柱状图表",
          icon: "ele-Menu",
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
          title: "日期操作",
          icon: "ele-Menu",
        },
      },
      {
        name: "throttle-tool",
        path: "throttle-tool",
        component: () => import("@/views/tool/throttle/index.vue"),
        meta: {
          title: "事件节流",
          icon: "ele-Menu",
        },
      },
    ],
  },
  {
    path: "/document",
    name: "document",
    meta: {
      title: "在线文档",
      icon: "ele-Menu",
      hidden: false,
    },
    component: () => import("@/layout/index.vue"),
    redirect: "https://flowertip.github.io/vitepress-blog/",
    children: [
      {
        path: "https://flowertip.github.io/vitepress-blog/",
        name: "vitepress-blog",
        meta: { title: "在线文档", icon: "ele-Menu", hidden: false },
      },
    ],
  },
  {
    path: "/project",
    name: "project",
    meta: {
      title: "开源项目",
      icon: "ele-Menu",
      hidden: false,
    },
    component: () => import("@/layout/index.vue"),
    redirect: "https://gitee.com/CodeTV",
    children: [
      {
        path: "https://gitee.com/CodeTV",
        name: "CodeTV",
        meta: { title: "开源项目", icon: "ele-Menu", hidden: false },
      },
    ],
  },
  {
    name: "setting",
    path: "/setting",
    component: () => import("@/layout/index.vue"),
    redirect: "/setting/permission",
    meta: { title: "系统管理", icon: "ele-Menu" },
    children: [
      {
        name: "permission",
        path: "/setting/permission",
        component: () => import("@/views/setting/permission/index.vue"),
        meta: { title: "权限管理", icon: "ele-Menu" },
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
              icon: "ele-Menu",
            },
          },
          {
            name: "user",
            path: "user",
            component: () =>
              import("@/views/setting/permission/user/index.vue"),
            meta: {
              title: "用户管理",
              icon: "ele-Menu",
            },
          },
        ],
      },
      {
        name: "department",
        path: "/setting/department",
        component: () => import("@/views/setting/department/index.vue"),
        meta: { title: "部门管理", icon: "ele-Menu" },
        redirect: "/setting/department/software",
        children: [
          {
            name: "software",
            path: "software",
            component: () =>
              import("@/views/setting/department/software/index.vue"),
            meta: {
              title: "软件人员",
              icon: "ele-Menu",
            },
          },
          {
            name: "maintenance",
            path: "maintenance",
            component: () =>
              import("@/views/setting/department/maintenance/index.vue"),
            meta: {
              title: "运维人员",
              icon: "ele-Menu",
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
