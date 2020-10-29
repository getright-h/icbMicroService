import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class DrapChooseLoadingDTO {
  // 你的抽象方法，具体在 Service 中实现
  abstract queryOrganizationList(params: QueryOrganizationListParam): Observable<DrapChooseLoadingReturn>;
  abstract queryDeviceTypeList(params: QueryDeviceTypeListParam): Observable<DrapChooseLoadingReturn>;
  abstract querySupplierList(params: QuerySupplierListParam): Observable<DrapChooseLoadingReturn>;
  abstract queryPurchaseSelectList(params: QueryPurchaseListParam): Observable<DrapChooseLoadingReturn>;
  abstract queryStorePositionList(params: QueryStorePositionListParam): Observable<DrapChooseLoadingReturn>;
}

// 下拉加载 Dto
export interface QueryOrganizationListParam {
  name?: string;
  systemId: string;
  index: number;
  size: number;
}
export interface QueryDeviceTypeListParam {
  name?: string;
  index: number;
  size: number;
}
export interface QueryVehiclePagedListParam {
  strValue?: string;
  index: number;
  size: number;
}
export interface QuerySupplierListParam {
  name?: string;
  typeId: string;
  index: number;
  size: number;
}

export interface QueryPurchaseListParam {
  index: number;
  size: number;
  name?: string;
}

export interface DrapChooseLoadingReturn {
  data: any;
  status: boolean;
}

export interface QueryStoreOrganizationResult {
  id: string;
  organizationId: string;
  name: string;
  code: string;
  parentId: string;
  parentCode: string;
  parentName: string;
}

export interface QueryStorePositionListParam {
  storeId?: string;
  name?: string;
  index: number;
  size: number;
}

export interface QueryAllotFlowTemplatePagedListParam {
  name: string;
  organizationId: string;
  index: 0;
  size: 0;
  beginTime: 0;
  endTime: 0;
}
