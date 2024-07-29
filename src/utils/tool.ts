import { RouteRecordRaw } from "vue-router";
import defaultSetting from "@/setting";
const mode = import.meta.env.VITE_ROUTER_MODE;

/**
 * @description 获取不同路由模式所对应的 url + params
 * @returns {String}
 */
export const getUrlWithParams = (): string => {
  const url = {
    hash: location.hash.substring(1),
    history: location.pathname + location.search,
  };
  return url[mode as "hash" | "history"];
};

export function normalizeStringPosix(path: string, allowAboveRoot: boolean) {
  var res = "";
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length) code = path.charCodeAt(i);
    else if (code === 47 /*/*/) break;
    else code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (
          res.length < 2 ||
          lastSegmentLength !== 2 ||
          res.charCodeAt(res.length - 1) !== 46 /*.*/ ||
          res.charCodeAt(res.length - 2) !== 46 /*.*/
        ) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = "";
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0) res += "/..";
          else res = "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) res += "/" + path.slice(lastSlash + 1, i);
        else res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

/**
 * link 代码来源 path-browserify@1.0.1 包
 * @returns
 */
export function resolve(...args: any) {
  console.log(args);

  var resolvedPath = "";
  var resolvedAbsolute = false;
  var cwd;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path;
    if (i >= 0) path = arguments[i];
    else {
      if (cwd === undefined)
        // cwd = process.cwd();
        path = "";
    }

    // Skip empty entries
    if (path.length === 0) {
      continue;
    }

    resolvedPath = path + "/" + resolvedPath;
    resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeStringPosix(
    resolvedPath,
    !resolvedAbsolute as boolean
  );

  if (resolvedAbsolute) {
    if (resolvedPath.length > 0) return "/" + resolvedPath;
    else return "/";
  } else if (resolvedPath.length > 0) {
    return resolvedPath;
  } else {
    return ".";
  }
}

/**
 * 获取当前显示路由的标题
 * @param {*} to
 * @returns title
 */
export function getPageTitle({ meta }: any): string {
  return meta && meta.title
    ? `${meta.title} - ${defaultSetting.title}`
    : defaultSetting.title;
}

/**
 * 展开数组中每项的meta属性值方法
 * @param data Array
 * @returns Array
 */
export function flatChildren(data: any): any {
  return data.map((item: any) => {
    return {
      ...item,
      title: item.meta.title,
      icon: item.meta.icon,
      redirect: item.redirect ? item.redirect : "--",
      hidden: item.meta.hidden ? "隐藏" : "显示",
      type: item.redirect ? "目录" : "页面",
      children:
        item.children && item.children.length > 0
          ? flatChildren(item.children)
          : [],
    };
  });
}

/**
 * @description 生成唯一 uuid
 * @returns {String}
 */
export function generateUUID(): string {
  let uuid = "";
  for (let i = 0; i < 32; i++) {
    let random = (Math.random() * 16) | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) uuid += "-";
    uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
  }
  return uuid;
}

/**
 *
 * @param dynamicRoutes
 * @param authRouterList
 * @returns
 */
export function filterAsyncRoutes(
  dynamicRoutes: RouteRecordRaw[],
  authRouterList: string[]
) {
  return dynamicRoutes.filter((route) => {
    // 1.如果route的name在routeNames中没有, 直接过滤掉
    if (!authRouterList.includes(route.name as string)) return false;

    // 2.如果当前route还有子路由(也就是有children), 需要对子路由也进行权限过滤
    if (route.children && route.children.length > 0) {
      route.children = filterAsyncRoutes(route.children, authRouterList);
    }
    return true;
  });
}
