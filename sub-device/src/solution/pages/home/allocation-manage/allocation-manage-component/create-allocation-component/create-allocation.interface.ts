/**
 * @export state变量定义和初始化
 * @class ICreateAllocationState
 */
import { SetAllotFlowTemplateParam } from '~model/dto/template-service.dto';
export class ICreateAllocationState {
  id: string;
  searchForm: SetAllotFlowTemplateParam = {
    name: ''
  };
  submitLoading = false;
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
