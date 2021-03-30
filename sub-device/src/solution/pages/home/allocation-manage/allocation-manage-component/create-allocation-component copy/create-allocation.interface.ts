/**
 * @export state变量定义和初始化
 * @class ICreateAllocationState
 */
import { SetAllotFlowTemplateParam } from '~model/dto/template-service.dto';
export class ICreateAllocationState {
  id: string;
  searchForm: SetAllotFlowTemplateParam = {
    name: '',
    content: [
      {
        key: 0,
        number: 0,
        typeId: '',
        typeName: ''
      }
    ]
  };
  submitLoading = false;
  flowList: Array<Array<IFlowNode>>;
}

export interface IFlowNode {
  attributeId: string;
  flowId: string;
  id: string;
  isMultiple: boolean;
  isSelected: boolean;
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
