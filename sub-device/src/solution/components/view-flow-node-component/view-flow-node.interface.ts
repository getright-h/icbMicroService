import { FlowList } from '~/solution/model/dto/allocation-template.dto';

/**
 * @export state变量定义和初始化
 * @class IViewFlowNodeState
 */
export class IViewFlowNodeState {}

export class ViewFlowNodeComponentProps {
  flowNodeSettingField: [{ attributeList: FlowList[]; flowNodeSettingFieldId: string }];
  canEdit: boolean;
}
