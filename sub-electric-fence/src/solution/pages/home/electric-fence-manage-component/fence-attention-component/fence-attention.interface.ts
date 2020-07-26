/**
 * @export state变量定义和初始化
 * @class IFenceAttentionState
 */
import moment, { Moment } from 'moment';
export class IFenceAttentionState {
  isLoading = false;
  searchForm: any = {
    index: 1,
    size: 10,
    begin: moment(moment().format('YYYY MM DD') + ' 00:00:00'),
    end: moment().add(1, 'months'),
    fenceId: '',
    status: '-1',
    thingId: '',
    thingType: 0,
    vehicleId: ''
  };
  tableData: any = [];
  total = 0;
  searchLoading = false;
  confirmModalLoading = false;
  visibleModal = false;
  modalTitle = '';
  modalWidth = 700;
  modalContainer: JSX.Element = null;
}
