import moment from 'moment';

/**
 * @export state变量定义和初始化
 * @class IStateListState
 */
export class IStateListState {
  isLoading = false;
  pageIndex = 1;
  pageSize = 10;
  tableData: any = [];
  total = 0;
  currentId = '';
  exportVisible = false;
  timeInfo: string[] = [
    moment()
      .subtract(3, 'days')
      .startOf('day')
      .format('YYYY-MM-DD HH:mm:ss'),
    moment().format('YYYY-MM-DD HH:mm:ss')
  ];
}
export enum ModalType {
  CREATE,
  EDIT
}
