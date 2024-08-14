// 本地存储

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

/**
 * @description 使用递归扁平化菜单，方便添加动态路由
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 */
export const getFlatMenuList = (
  menuList: AppTypeConfig.MenuOption[]
): AppTypeConfig.MenuOption[] => {
  let result: AppTypeConfig.MenuOption[] = [];
  menuList.forEach((item) => {
    result.push(item);
    if (item.children) {
      result = result.concat(getFlatMenuList(item.children));
      // delete item.children; // 可以选择删除children属性，如果不需要原始结构
    }
  });

  return result;
};
