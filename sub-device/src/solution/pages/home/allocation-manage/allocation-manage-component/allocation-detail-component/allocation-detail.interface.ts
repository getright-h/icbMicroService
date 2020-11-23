/**
 * @export state变量定义和初始化
 * @class IAllocationDetailState
 */
export class IAllocationDetailState {
  detail: any = {};
  flowList: Array<Array<IFlowNode>>;
}

export interface IFlowNode {
  attributeId: string;
  flowId: string;
  id: string;
  isMultiple: false;
  isSelected: false;
  name: string;
  organizationCode: string;
  organizationId: string;
  organizationName: string;
  sort: number;
  storeId: string;
  storeName: string;
  storePositionId: string;
  storePositionName: string;
}
