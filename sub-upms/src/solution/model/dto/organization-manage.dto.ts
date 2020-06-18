import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class OrganizationManageDTO {
  // 你的抽象方法，具体在 Service 中实现
  abstract getOrganizationChild(code: string): Observable<ExampleResponseResult>;
  abstract queryOrganizationList(params: QueryOrganizationListParams): Observable<ExampleResponseResult>;
  abstract insertOrganization(params: InsertOrganizationParams): Observable<ExampleResponseResult>;
  abstract setOrganization(params: SetOrganizationParams): Observable<ExampleResponseResult>;
}

// 请求 Dto
export interface QueryOrganizationListParams {
  systemId?: string;
  typeId?: string;
  parentId?: string;
  hierarchyType?: number;
  index: number;
  size: number;
}

export interface InsertOrganizationParams {
  systemCode: string;
  typeId: string;
  logoUrl?: string;
  unitName: string;
  shorterName?: string;
  unitCode: string;
  unitMobile: string;
  contactName: string;
  contactMobile: string;
  unitState: string;
  unitAddress: string;
  unitRemark?: string;
  longitude?: string;
  latitude?: string;
  picture?: string;
  province: string;
  city: string;
  area: string;
  parentId?: string;
  parentName?: string;
  parentCode?: string;
}
export interface SetOrganizationParams {
  id: string;
  systemCode: string;
  typeId: string;
  logoUrl?: string;
  unitName: string;
  shorterName?: string;
  unitCode: string;
  unitMobile: string;
  contactName: string;
  contactMobile: string;
  state: boolean;
  unitAddress: string;
  unitRemark?: string;
  longitude?: string;
  latitude?: string;
  picture?: string;
  province: string;
  city: string;
  area: string;
  parentId?: string;
  parentName?: string;
  parentCode?: string;
}

// 响应 Dto
export interface ExampleResponseResult {
  data: any;
  status: boolean;
}
