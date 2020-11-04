import { OwnerDetailResponseResult } from '~/solution/model/dto/customer-manage.dto';

/**
 * @export state变量定义和初始化
 * @class IOwnerInfoDetailState
 */
export class IOwnerInfoDetailState {
  confirmLoading = false;
  hasMore = false;
  details: OwnerDetailResponseResult;
}
/**
 * @export props变量定义和初始化
 * @class IOwnerInfoDetailProps
 */
export class IOwnerInfoDetailProps {
  id: string;
  visible: boolean;
  close: () => void;
}

export enum WorkEnum {
  'IT/互联网' = 1,
  '暂无' = -200
}
