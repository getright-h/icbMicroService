import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class ApprovalManageDTO {
  // 你的抽象方法，具体在 Service 中实现
}

export interface InsertApprovalFormTemplateParams {
  id: string;
  templateName: string;
  controlList: ControlList[];
  approverList: ApproverList[];
  businessData: string;
  groupId?: string;
  businessType: number;
}

export interface QueryApprovalGroupDetailReturn {
  organizationList: OrganizationList[];
  id: string;
  name: string;
  state: number;
  stateText: string;
  type: number;
  typeText: string;
  organizationId: string;
  parentOrganizationId: string;
  createTime: string;
  createTimeStamp: number;
  creatorId: string;
  creatorName: string;
  relationOrganizationId: string;
}

export interface QueryApprovalFormTemplatePagedList {
  name: string;
  groupId: string | number;
  index: number;
  size: number;
  beginTime: number;
  endTime: number;
}

export interface QueryApprovalFormTemplatePagedListReturn {
  id: string;
  name: string;
  state: number;
  stateText: string;
  organizationId: string;
  organizationName: string;
  createTime: string;
  createTimeStamp: number;
  businessType: number;
  businessTypeText: string;
}

export interface OrganizationList {
  id: string;
  code: string;
  parentId: string;
  parentCode: string;
  parentName: string;
  name: string;
  typeId: string;
  typeName: string;
  isHasChildren: boolean;
  isHasChildOrganization: boolean;
  systemId: string;
}

export interface QueryApprovalGroupListResult {
  id: string;
  name: string;
  state: number;
  stateText: string;
  organizationId: string;
  relationOrganizationId: string;
  createTime: string;
  createTimeStamp: number;
  creatorId: string;
  creatorName: string;
}
export interface InsertApprovalGroupParams {
  name: string;
  id?: string;
  organizationList: string[];
  parentOrganizationId: string;
  type: number;
}

interface ApproverList {
  id: string;
  sort: number;
  isAllPass: boolean;
  attributeList: AttributeList[];
}

interface AttributeList {
  id: string;
  mode: number;
  personId: string;
}

export interface ControlList {
  id: string;
  controlKey: string;
  controlValue: string;
  title: string;
  isRequired: boolean;
  type: number;
}
