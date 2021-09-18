import { FenceManageListReturnModal } from '~/solution/model/dto/fence-manage.dto';
import { Dispatch } from 'react';

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
}

export interface IMainFenceLeftProps {}
