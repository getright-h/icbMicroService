/**
 * @export state变量定义和初始化
 * @class IAddMonitorCarState
 */
import { DataNode } from 'rc-tree/lib/interface';
export class IAddMonitorCarState {
  addCarDeviceList: any[] = [];
  delCarDeviceList: any[] = [];
  addChoseList: any[] = [];
  delChoseList: any[] = [];
  organizationCodeList: any[] = [];
  expandedKeys: string[] = [];
  checkedKeys: string[] = [];
  confirmLoading = false;
  checkedObject: DataNode[] = [];
  selectedVehicleCount = 0;
  totalVehicleCount = 0;
}

export interface IAddMonitorCarProps {
  addMonitorModal: boolean;
  colse: Function;
  groupId: string;
}
