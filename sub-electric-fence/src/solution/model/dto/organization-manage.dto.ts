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
