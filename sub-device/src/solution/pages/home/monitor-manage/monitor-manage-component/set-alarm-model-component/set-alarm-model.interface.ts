import { AlarmPackageItem, AlarmTemplateItem } from '~/solution/model/dto/alarm-manage.dto';

/**
 * @export state变量定义和初始化
 * @class IAddMonitorGroupState
 */
export class IAddMonitorGroupState {
  submitLoading = false;
  templateList: EditAlarmTemplateItem[] = [];
}

export interface ISetAlarmProp {
  close: Function;
  data: any;
  visible: boolean;
}

export interface EditAlarmTemplateItem extends AlarmTemplateItem {
  curSelectTemp?: AlarmPackageItem;
}
