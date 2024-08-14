/**
 * 全局设置的类型声明
 */
declare namespace AppTypeConfig {
  type ElementPlusSizeType = "large" | "default" | "small";
  interface MetaProp {
    icon: string;
    title: string;
    activeMenu?: string;
    isLink?: string;
    isHide: boolean;
    isFull: boolean;
    isAffix: boolean;
    isKeepAlive: boolean;
  }
  interface MenuOption {
    path: string;
    name: string;
    component?: string | (() => Promise<unknown>);
    redirect?: string;
    meta: AppTypeConfig.MetaProp;
    children?: AppTypeConfig.MenuOption[];
  }
  interface SettingConfig {
    showHeaderBar?: boolean;
    showFooterBar?: boolean;
    showHeaderLogo?: boolean;
    showTagsView?: boolean;
    showBreadcrumb?: boolean;
    layout?: string;
    color?: string;
    themeName?: string;
    topShowCollapsed?: boolean;
  }
}

/**
 * 请求参数类型声明
 */
declare namespace RequestData {
  interface loginParam {
    username: string;
    password: string;
    code?: string;
  }
  interface DelStudentParam {
    ids: number[];
  }
  interface SaveStudentParam {
    id?: number | string;
    username: string;
    age: number | string;
    address: string;
    sex: number | string;
    big: number | string;
    color: string;
    hobby: string;
    school: string;
    time: Date | string;
    avatarUrl: string;
  }
  interface SaveMenuParam {

  }

  interface DelMenuParam {

  }
  interface MenuListParam {
    pageSize?: number;
    currentPage?: number;
    username?: string;
    big?: number;
    sex?: number;
    address?: string;
    time?: Date;
  }

  interface GetRoleParam {
    userId: number
  }
  /**
   * reqSaveAccount 保存账号信息接口的请求参数
   * 
   * id: number 数值类型 为可选参数，更新账号信息时需要传递id参数
   * 
   * username: string 字符串类型 账号名为必选参数
   * 
   * password: string 字符串类型 账号密码为必选参数
   */
  interface SaveAccountParam {
    id?: number;
    username: string;
    password: string
  }

  interface DelAccountParam {
    ids: number[]
  }

}

interface ResponseData {
  code: number;
  data: {
    list?: any[];
    message: string;
  };
}


/**
 * 响应数据类型声明
 */
declare namespace Response {
  type MenuItem = {
    name: string;
    code: string;
    level: number;
    updateTime: Date;
  }

  interface LoginRes extends ResponseData {
    data: {
      token: string;
    };
  }

  interface LogoutRes extends ResponseData {
    data: {
      status?: boolean;
      message: string;
    }
  }
  interface UserInfoRes extends ResponseData {
    data: {
      id: string;
      checkUser: {
        username: string;
      };
      list: Response.MenuItem[];
      buttons: string[];
    };
  }

  interface MenuListRes extends ResponseData {
    data: {
      list: Response.MenuItem[];
      message: string;
    }
  }

  interface SaveStudentRes extends ResponseData {
    data: {
      id?: number
    }
  }

  interface StudentListRes extends ResponseData {

  }

  interface DelStudentRes extends ResponseData {
    data: {
      message: string
    }
  }

  interface UploadAvatarRes extends ResponseData {
    data: {
      url?: string,
      message: string
    }
  }

  interface PermissionMenuRes extends ResponseData {

  }

  interface RoleListRes extends ResponseData {
    
  }
}