/**
 * @export state变量定义和初始化
 * @class IAllocationTemplateState
 */
export class IAllocationTemplateState {
  isLoading = false;
  searchForm = {
    page: 1,
    size: 10
  };
  tableData: any = [];
  total = 0;
}
export enum ModalType {
  CREATE,
  EDIT,
  DELETE
}
