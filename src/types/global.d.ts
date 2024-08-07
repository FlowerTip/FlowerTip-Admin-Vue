/**
 * 登录接口参数类型
 * 1. 使用 declare 关键字来标识全局的类型声明
 * 2. 使用直接 LoginParams || LoginParams['username']
 */
declare interface LoginParams {
  username: string;
  password: string;
  code?: string;
}

/**
 * 登录模块接口参数类型
 * 1. namespace 声明命名空间的类型，明确区分类型的模块
 * 2. 使用需要前置模块名 Login.ReqParams || Login.ReqParams['username]
 */
declare namespace Login {
  interface ReqParams {
    username: string;
    password: string;
  }

  interface SaveStudent {
    username: string;
    age: number;
    address: string;
    sex: number;
    big: number;
    color: string;
    hobby: string;
    school: string;
    time: Date;
    avatarUrl: string;
  }
}

interface ResponseData {
  code: number;
  data: {
    list?: any[];
    message: string;
  };
}
declare namespace Response {
  interface LoginRes extends ResponseData {
    data: {
      token: string;
    };
  }
  interface UserInfoRes extends ResponseData {
    data: {
      checkUser: {
        username: string;
      };
      list: string[];
      buttons: string[];
    };
  }
}

/**
 * 全局设置的类型声明
 */
declare namespace GolabalSetting {}
