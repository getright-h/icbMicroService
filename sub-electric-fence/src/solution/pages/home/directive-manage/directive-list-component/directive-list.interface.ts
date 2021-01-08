/**
 * @export state变量定义和初始化
 * @class IAlarmParameterState
 */
import moment from 'moment';
export class IDirectiveListState {
  isLoading = false;
  pageIndex = 1;
  pageSize = 10;
  tableData: any = [];
  total = 0;
  currentId = '';
  patchModalVisible = false;
  delModalVisible = false;
  searchTime = {
    endTime: moment(moment().format('YYYY MM DD') + ' 23:59:59').valueOf(),
    beginTime: moment()
      .subtract(1, 'months')
      .valueOf()
  };
}
export enum ModalType {
  CREATE,
  EDIT,
  PATCH,
  DEL
}
