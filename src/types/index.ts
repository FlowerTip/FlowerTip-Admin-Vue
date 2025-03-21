import { RouteRecordRaw } from "vue-router";
import { Component } from "vue";
export interface StatePermission {
  token: string | null;
  username: string;
  permissionButtonList: string[];
  backMenuList: RouteRecordRaw[];
  authMenuList: RouteRecordRaw[];
  sidebarMenuList: RouteRecordRaw[];
  roleNames: string;
  workPostName: string;
  departmentName: string;
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
  departmentId?: string | number;
};

export type AvatarUploadType = "round" | "circle";

export type AvatarProps = {
  width?: string | number;
  height?: string | number;
  type?: AvatarUploadType;
  disabled?: boolean;
  fileType?: string[];
  fileSize?: number;
  uploadParam?: {
    id: number | string;
  };
};

/**
 * [key: string] key是字符串 'mixbar' | 'topbar' | 'sidebar' | 'simplebar'
 *
 * Component vue组件对应的名称 mixbar | topbar | sidebar | simplebar
 */
export type LayoutComponent = {
  [key: string]: Component;
};
