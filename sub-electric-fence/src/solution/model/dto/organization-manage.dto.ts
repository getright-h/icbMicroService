import { Observable } from 'rxjs';
import { DataNode } from 'rc-tree/lib/interface';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class OrganizationManageDTO {
  // 你的抽象方法，具体在 Service 中实现
  abstract getOrganizationChild(params: { id: string; hierarchyType: number }): Observable<Array<Datum>>;
  abstract queryOrganizationTypeListBySystemId(systemId: string): Observable<Array<OrganizationTypeResponse>>;
  abstract queryOrganizationByTypeId(params: { typeId: string }): Observable<Array<Datum>>;
}

export interface Datum extends DataNode {
  id: string;
  code: string;
  parentId: string;
  parentCode: string;
  parentName: string;
  name: string;
  builderName: string;
  typeId: string;
  typeName: string;
  hierarchyType: number;
  isHasChildren: boolean;
  createTime: string;
  extendAttribution: string;
  extendAttributionModel: ExtendAttributionModel;
  updateTime: string;
  state: boolean;
  instruction: string;
  isHasChildOrganization: boolean;
  isArea: boolean;
  systemId: string;
}

export interface ExtendAttributionModel {
  logoUrl: string;
  unitCode: string;
  unitName: string;
  unitState: string;
  parentUnit: string;
  unitMobile: string;
  unitRemark: string;
  contactName: string;
  shorterName: string;
  unitAddress: string;
  contactMobile: string;
}

export interface OrganizationTypeResponse {
  id: string;
  code: string;
  name: string;
  systemId: string;
  systemName: string;
  instruction: string;
  isRelevancy: boolean;
  createTime: string;
  updateTime: string;
  isHasChildren: boolean;
}

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
  storePositionId: string;
  name: string;
  storeId: string;
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

export class AddWarehouseParams {
  id?: string;
  name: string;
  organizationId: string;
  organizationName: string;
  organizationCode: string;
  provinceName: string;
  provinceCode: string;
  cityName: string;
  cityCode: string;
  areaName: string;
  areaCode: string;
  addressDetail: string;
  personId: string;
  personName: string;
  personMobile: string;
  minAlarm: number;
  maxAlarm: number;
  isDefault: true;
  areaDetail: string[];
  constructor() {
    this.isDefault = true;
  }
}

export interface VStoreSimple {
  id: string;
  storeId: string;
  name: string;
  stockNumber: number;
  code: string;
  organizationId: string;
  organizationCode: string;
  organizationName: string;
}

export interface InsertStorePositionParams {
  storeId: string;
  name: string;
  positionAddress: string;
  minAlarm: number;
  maxAlarm: number;
  alarmDay: number;
  isDefault: boolean;
}
