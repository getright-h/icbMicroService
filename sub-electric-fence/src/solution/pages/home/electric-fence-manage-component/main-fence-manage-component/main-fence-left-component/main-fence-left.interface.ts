/**
 * @export state变量定义和初始化
 * @class IMainFenceLeftState
 */
export class IMainFenceLeftState {
  isLoading = false;
  searchForm: { index: number; size: number } = {
    index: 1,
    size: 10
  };
  tableData: any = [];
  total = 0;
  searchLoading = false;
}
