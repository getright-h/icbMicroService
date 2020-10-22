import { PAGE_SIZE } from '~/solution/shared/constant/common.const';

/**
import { PAGE_SIZE } from '~/solution/shared/constant/common.const';
 * @export state变量定义和初始化
 * @class IAppravalTemplateState
*/
export class IAppravalTemplateState {
  isLoading = false;
  searchForm: {
    name: string;
    index: number;
    size: number;
  } = {
    name: '',
    index: 1,
    size: PAGE_SIZE
  };
  total = 0;
  addMoveTemplateVisible = false;
  tableData: any = [];
}
export const TREE_MAP = {
  title: 'name',
  key: 'id'
};
