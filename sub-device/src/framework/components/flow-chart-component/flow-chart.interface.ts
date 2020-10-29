import { FlowList } from '~/solution/model/dto/allocation-template.dto';

/**
 * @export state变量定义和初始化
 * @class IFlowChartState
 */
export class IFlowChartState {
  data: any;
}

export class FlowChartComponentProps {
  flowNodeSettingField: [{ attributeList: FlowList[]; flowNodeSettingFieldId: string }];
  canEdit: boolean;
}
