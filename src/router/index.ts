import { createRouter, createWebHashHistory } from "vue-router";

import { staticRoutes } from "@/router/modules/routes";

const router = createRouter({
  // 路由模式hash
  history: createWebHashHistory(),
  routes: staticRoutes,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});

export default router;
