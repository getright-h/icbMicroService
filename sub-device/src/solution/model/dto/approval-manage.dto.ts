/**
 * 真实开发中，请将示例代码移除
 */

export abstract class ApprovalManageDTO {
  // 你的抽象方法，具体在 Service 中实现
}

export interface InsertApprovalFormTemplateParams {
  id: string;
  templateName: string;
  formInstanceId: string;
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

export interface ApproverList {
  id?: string;
  sort: number;
  isAllPass: boolean;
  attributeList: AttributeList[];
}

export interface AttributeList {
  id: string;
  mode: number;
  personId: string;
  personName: string;
}

export interface ControlList {
  id: string;
  controlKey: string;
  controlValue: string;
  title: string;
  isRequired: boolean;
  type: number;
}

export interface QueryApprovalApplyListParams {
  status: number;
  groupId: string;
  templateId: string;
  creatorId: string;
  organizationId: string;
  sTime: number;
  eTime: number;
  index: number;
  size: number;
}

export interface QueryApprovalApplyListReturn {
  approverRemark: ApproverRemark;
  id: string;
  groupId: string;
  groupName: string;
  templateId: string;
  templateName: string;
  organizationId: string;
  organizationName: string;
  status: number;
  statusText: string;
  creatorId: string;
  creatorName: string;
  createTime: string;
  createTimeStamp: number;
}

interface ApproverRemark {
  id: string;
  flowId: string;
  userName: string;
  userId: string;
  remark: string;
  createTime: string;
}

export interface QueryApprovalProcessListParams {
  processStatus: number;
  groupId: string;
  templateId: string;
  creatorId: string;
  organizationId: string;
  sTime: number;
  eTime: number;
  index: number;
  size: number;
}

export interface QueryApprovalProcessListReturn {
  approverRemark: ApproverRemark;
  passed: boolean;
  nodePassed: boolean;
  processStatusText: string;
  id: string;
  groupId: string;
  groupName: string;
  templateId: string;
  templateName: string;
  organizationId: string;
  organizationName: string;
  status: number;
  statusText: string;
  creatorId: string;
  creatorName: string;
  createTime: string;
  createTimeStamp: number;
}
