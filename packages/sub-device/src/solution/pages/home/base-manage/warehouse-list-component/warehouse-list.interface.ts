import { QueryStorePositionParams, StorePositionPagedDataList } from '~/solution/model/dto/warehouse-list.dto';
import { PAGE_SIZE } from '~/solution/shared/constant/common.const';

/**
 * @export state变量定义和初始化
 * @class IWarehouseListState
 */
export class IWarehouseListState {
  isLoading: boolean;
  searchForm: QueryStorePositionParams = {
    index: 1,
    size: PAGE_SIZE,
    name: '',
    storeId: ''
  };
  tableData: StorePositionPagedDataList[];
  total: number;
  totalNumber = '**';
  totalAlarm = '**';
  isEditShippingSpaceModal = false;
  editShippingSpaceId: string;
  addShippingSpaceVisible: boolean;
}
