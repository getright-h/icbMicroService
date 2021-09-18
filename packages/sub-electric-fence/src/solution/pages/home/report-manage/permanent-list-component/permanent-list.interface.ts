/**
 * @export state变量定义和初始化
 * @class IAlarmParameterState
 */
export class IDirectiveListState {
  isLoading = false;
  pageIndex = 1;
  pageSize = 10;
  tableData: any = [];
  total = 0;
  timeInfo: string[] = [];
  currentId = '';
  sort = -1;
  sortInfo: { key: string; type: string };
  exportVisible = false;
}
export enum ModalType {
  CREATE,
  EDIT
}

export const SORT_LIST: Array<{
  type: string;
  sort: number;
}> = [
  {
    // "stayCount "到访次数"
    type: 'stayCount',
    sort: 1
  },
  {
    // /平均停留时间
    type: 'stayAvgText',
    sort: 2
  },
  {
    // "stayDurationText" "停留总时长"
    type: 'stayDurationText',
    sort: 3
  }
];
