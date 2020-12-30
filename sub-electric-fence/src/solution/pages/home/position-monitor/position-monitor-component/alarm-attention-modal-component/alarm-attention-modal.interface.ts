import { QueryMonitorAlarmInfoPagedListReturn } from '../../../../../model/dto/position-monitor.dto';

/**
 * @export state变量定义和初始化
 * @class IAlarmAttentionModalState
 */
export class IAlarmAttentionModalState {
  tableInfo: QueryMonitorAlarmInfoPagedListReturn[] = [];
  index = 1;
  total = 0;
  size = 10;
  isLoading = false;
}

export interface IAlarmAttentionModalProps {
  isModalVisible: boolean;
  handleCancel: () => void;
}
