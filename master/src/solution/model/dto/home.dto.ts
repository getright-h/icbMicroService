import { Observable } from 'rxjs';
import { IMenu } from '~components/base/menu-component/menu.interface';

export abstract class HomeDTO {
  // 获取菜单和权限
  abstract getMenuAndAuthKeys(): Observable<MenuAndAuthResult>;
}

// 获取菜单权限
export interface MenuAndAuthResult {
  data: IMenu[];
}

export interface MyInfo {
  id: string;
  systemId: string;
  systemCode: string;
}

export interface MenuRequestParam {
  systemId: string;
  roleIdList: Array<string>;
}

export interface DownloadTaskParam {
  index: number;
  size: number;
  name?: string;
}

export interface DownloadTaskResult {
  taskCount: number;
  list: DownloadTaskList;
}

interface DownloadTaskList {
  dataList: DownloadTask[];
  index: number;
  size: number;
  total: number;
  pages: number;
  hasPrev: boolean;
  hasNext: boolean;
}

interface DownloadTask {
  id: string;
  name: string;
  fileSize: string;
  businessName: string;
  finishTime: string;
  downloadPath: string;
  state: number;
  suffixName: string;
  creatorId: string;
  creatorName: string;
  createTime: string;
}
