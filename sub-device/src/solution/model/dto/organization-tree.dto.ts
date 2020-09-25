import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class OrganizationTreeDTO {
  // 你的抽象方法，具体在 Service 中实现
  abstract queryStoreOrganization(params: QueryStoreOrganizationParam): Observable<Array<OrganizationInfo>>;
  abstract queryStoreOrganizationListSub(parentId: string): Observable<Array<OrganizationInfo>>;
}

export interface QueryStoreOrganizationParam {
  typeId: string;
  id?: string;
}

export interface OrganizationInfo {
  id: string;
  organizationId: string;
  name: string;
  code: string;
  parentId: string;
  parentCode: string;
  parentName: string;
  isHasChildOrganization: boolean;
  isHasChildren: boolean;
}
