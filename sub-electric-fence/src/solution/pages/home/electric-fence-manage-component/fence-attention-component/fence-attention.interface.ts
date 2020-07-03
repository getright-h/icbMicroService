/**
 * @export state变量定义和初始化
 * @class IFenceAttentionState
 */
export class IFenceAttentionState {
  isLoading = false;
  searchForm: { index: number; size: number } = {
    index: 1,
    size: 10
  };
  tableData: any = [];
  total = 0;
  searchLoading = false;
  confirmModalLoading = false;
  visibleModal = false;
  modalTitle = '';
  modalContainer: JSX.Element = null;
}
