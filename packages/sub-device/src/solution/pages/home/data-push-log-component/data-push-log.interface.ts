import { ContentList, SynchronLogPageListResType } from '~/solution/model/dto/customer-manage.dto';

/**
 * @export state变量定义和初始化
 * @class IDataPushLogState
 */
export class IDataPushLogState {
  isLoading = false;
  pageIndex = 1;
  pageSize = 10;
  tableData: SynchronLogPageListResType[] = [];
  total = 0;
  detailVisible = false;
  currentData: ContentList;
}
