/**
 * @export state变量定义和初始化
 * @class IDetailState
 */
export class IDetailState {
  deviceData: any[] = [];
  detail: any = {};
  flowList: any[] = [];
  currentData = {};
  importVisible = false;
  rollbackVisible = false;
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
