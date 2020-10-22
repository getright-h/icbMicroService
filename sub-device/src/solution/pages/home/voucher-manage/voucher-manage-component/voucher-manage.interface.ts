/**
 * @export state变量定义和初始化
 * @class IVoucherManageState
 */
export class IVoucherManageState {
  isLoading = false;
  searchForm = {
    page: 1,
    size: 10,
    beginTime: '',
    endTime: ''
  };
  tableData: any = [];
  total = 0;
  editVisible = false;
  detailVisible = false;
  currentId = '';
}
export enum ModalType {
  CREATE,
  EDIT,
  DELETE,
  DETAIL
}
