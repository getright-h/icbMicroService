import { MonitorObjectListParams } from '~/solution/model/dto/monitor-object-service.dto';
import moment from 'moment';
/**
 * @export state变量定义和初始化
 * @class IMonitoringObjectState
 */
export class IMonitoringObjectState {
  isLoading = false;
  searchForm: MonitorObjectListParams = {
    fenceId: '',
    thingId: '',
    vehicleId: '',
    ownerId: '',
    index: 1,
    size: 10,
    begin: moment(moment().format('YYYY MM DD') + ' 00:00:00'),
    end: moment().add(1, 'months')
  };
  visibleModal = false;
  tableData: any[];
  total = 0;
  confirmModalLoading = false;
  handleModalOk = false;
  modalTitle = '';
  modalContainer: JSX.Element = null;
}

export enum ModalType {
  BINDCAR,
  FENCETYPE
}
