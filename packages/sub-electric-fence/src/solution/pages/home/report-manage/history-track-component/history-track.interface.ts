import moment from 'moment';

/**
 * @export state变量定义和初始化
 * @class IHistoryTrackState
 */
export class IHistoryTrackState {
  isLoading = false;
  pageIndex = 1;
  pageSize = 10;
  tableData: any = [];
  total = 0;
  currentId = '';
  exportVisible = false;
  canExport = false;
  timeInfo: string[] = [moment({ hour: 0 }).format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss')];
}
