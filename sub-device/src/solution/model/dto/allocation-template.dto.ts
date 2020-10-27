import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class AllocationTemplateDTO {
  // 你的抽象方法，具体在 Service 中实现
  abstract queryAllotFlowTemplatePagedList(
    params: QueryAllotFlowTemplatePagedListParams
  ): Observable<{ dataList: QueryAllotFlowTemplatePagedListReturn[]; total: number }>;
}

export interface QueryAllotFlowTemplatePagedListParams {
  name: string;
  index: number;
  size: number;
  beginTime: number;
  endTime: number;
}

export interface QueryAllotFlowTemplatePagedListReturn {
  id: string;
  name: string;
  type: number;
  typeText: string;
  organizationName: string;
  state: number;
  stateText: string;
  createTime: string;
  creatorName: string;
}

export interface InsertAllotFlowTemplateParams {
  name: string;
  type: number;
  flowList: FlowList[];
}

export interface FlowList {
  warehouseCascaderArray?: Array<string>;
  flowNodeSettingFieldId?: string;
  flowId?: string;
  childNodeId?: string;
  attributeId?: string;
  organizationId?: string;
  organizationName?: string;
  organizationCode?: string;
  storeId?: string;
  storeName?: string;
  storePositionId?: string;
  storePositionName?: string;
  isMultiple?: boolean;
  sort?: number;
  isSelected?: boolean;
}
