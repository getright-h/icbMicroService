import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class DrapChooseLoadingDTO {
  // 你的抽象方法，具体在 Service 中实现
  abstract manageList(
    params: DrapChooseLoadingParam
  ): Observable<{ dataList: DrapChooseLoadingReturn[]; total: number }>;
}

// 下拉加载 Dto
export interface DrapChooseLoadingParam {
  name: string;
  index: number;
  size: number;
}

export interface DrapChooseLoadingReturn {
  id: string;
  name: string;
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

export interface DrapChooseLoadingParams {
  name?: string;
  index: number;
  size: number;
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

export interface QueryOwnerListParam {
  name: string;
  index: number;
  size: number;
}

export interface QueryDeviceListParam {
  code: string;
  organizationId: string;
  index: number;
  size: number;
}

export interface QueryStoreListParam {
  name: string;
  index: number;
  size: number;
}

export interface QueryVehicleListParam {
  strValue: string;
  index: number;
  size: number;
}

export interface QueryApprovalFormTemplateParams {
  name?: string;
  groupId?: string;
  index: number;
  size: number;
}

export interface IDirectiveReturn {
  id?: string; // id ,
  cmdName?: string; // 指令名称 ,
  cmdCode?: string; // 指令码 ,
  sort?: number; //显示顺序 ,
  isVerify?: boolean; // 需要密码验证 ,
  hasSwitch?: boolean; // 包含打开关闭按钮
  hasArgs?: boolean; // 是否自定义模板参数
}
