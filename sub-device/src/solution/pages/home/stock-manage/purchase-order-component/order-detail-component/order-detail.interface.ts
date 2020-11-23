import { QueryPurchaseDetailResult } from '~/solution/model/dto/stock-manage.dto';

/**
 * @export state变量定义和初始化
 * @class IOrderDetailState
 */
export class IOrderDetailState {
  details: QueryPurchaseDetailResult;
}
/**
 * @export props变量定义和初始化
 * @class IOrderDetailProps
 */
export class IOrderDetailProps {
  id: string;
  visible: boolean;
  close: () => void;
}
