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
  businessType: number;
}

export interface InsertApprovalGroupParams {
  name: string;
  organizationList: string[];
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

interface ControlList {
  id: string;
  controlKey: string;
  controlValue: string;
  title: string;
  isRequired: boolean;
  type: number;
}
