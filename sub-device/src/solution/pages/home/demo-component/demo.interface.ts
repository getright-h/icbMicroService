/**
 * @export state变量定义和初始化
 * @class IDemoState
 */
export class IDemoState {
  searchForm = {
    index: 1,
    size: 10
  };
  total: number;
  tableData: any = [];
  isLoading = false;
}
