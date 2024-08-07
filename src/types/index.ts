import { RouteRecordRaw } from "vue-router";

export interface TabInterFace {
  title: string;
  name: number;
}

export interface LoginRequestParams {
  username: string;
  password: string;
}

export interface ResponseResult {
  code: number;
}

export interface LoginResponseResult extends ResponseResult {
  data: {
    token: string;
  };
}

/* Menu */
export interface MenuOptions {
  path: string;
  name: string;
  component?: string | (() => Promise<unknown>);
  redirect?: string;
  meta: MetaProps;
  children?: MenuOptions[];
}

export interface MetaProps {
  icon: string;
  title: string;
  activeMenu?: string;
  isLink?: string;
  isHide: boolean;
  isFull: boolean;
  isAffix: boolean;
  isKeepAlive: boolean;
}

export interface StatePermission {
  token: string;
  username: string;
  permissionButtonList: string[];
  backMenuList: RouteRecordRaw[];
  authMenuList: RouteRecordRaw[];
  sidebarMenuList: RouteRecordRaw[];
}

export interface LayoutType {
  mixbar?: string;
  topbar?: string;
  sidebar?: string;
}

export interface SearchFormInterFace {
  [key: string]: string | number | [];
}

export type PagainationType = {
  pageSize?: number;
  currentPage?: number;
  username?: string;
  big?: number;
  sex?: number;
  address?: string;
  time?: Date;
};

export type AvatarUploadType = "round" | "circle";

export type AvatarProps = {
  width: string | number;
  height: string | number;
  type: AvatarUploadType;
  disabled: boolean;
  fileType: string[];
  fileSize: number;
  uploadParam: {
    id: number | string;
  };
};
