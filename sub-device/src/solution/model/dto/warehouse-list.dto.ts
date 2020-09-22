import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class WarehouseListDTO {
  // 你的抽象方法，具体在 Service 中实现
  abstract queryOrganizationPagedList(params: QueryOrganizationPagedParams): Observable<QueryOrganizationPagedReturn>;
}

export interface QueryOrganizationPagedParams {
  systemId: string;
  name: string;
  index: number;
  size: number;
  beginTime: number;
  endTime: number;
}

export interface QueryOrganizationPagedReturn {
  id: string;
  organizationId: string;
  name: string;
  code: string;
  parentId: string;
  parentCode: string;
  parentName: string;
}

export interface QueryStorePositionReturn {
  storePositionPagedList: StorePositionPagedList;
  name: string;
  totalNumber: number;
  totalAlarm: string;
}

export interface StorePositionPagedList {
  dataList: StorePositionPagedDataList[];
  index: number;
  size: number;
  total: number;
  pages: number;
  hasPrev: boolean;
  hasNext: boolean;
}

export interface StorePositionPagedDataList {
  id: string;
  storeId: string;
  name: string;
  code: string;
  positionAddress: string;
  isDefault: boolean;
  isDefaultText: string;
  alarm: string;
  alarmDay: number;
  alarmDayText: string;
  stockNumber: number;
}

export interface QueryStorePositionParams {
  storeId?: string;
  name: string;
  index: number;
  size: number;
  beginTime?: number;
  endTime?: number;
}

export interface QueryStoreOrganizationReturn {
  id: string;
  organizationId: string;
  name: string;
  code: string;
  parentId: string;
  parentCode: string;
  parentName: string;
}
