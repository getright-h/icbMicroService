import { AllotNodeFlowInput } from '~/solution/model/dto/allocation-template.dto';

/**
 * @export state变量定义和初始化
 * @class IFlowNodeState
 */
export class IFlowNodeState {}

export class IFlowNodeProps {
  flowNodeSettingField: AllotNodeFlowInput[];
  postCurrentChooseInfo: (flowNodeSettingFieldReturn: AllotNodeFlowInput[]) => void;
}
