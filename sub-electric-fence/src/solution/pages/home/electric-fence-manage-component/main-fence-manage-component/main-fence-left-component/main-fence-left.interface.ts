import { FenceManageListReturnModal } from '~/solution/model/dto/fence-manage.dto';

/**
 * @export state变量定义和初始化
 * @class IMainFenceLeftState
 */
export class IMainFenceLeftState {
  isLoading = false;
  searchForm: { index: number; size: number; name: string } = {
    index: 1,
    size: 5,
    name: ''
  };
  tableData: Array<FenceManageListReturnModal> = [];
  total = 0;
  searchLoading = false;
}

export interface IMainFenceLeftProps {
  editPopShow: (data: FenceManageListReturnModal) => void;
  rowClick: (record: FenceManageListReturnModal) => void;
}
