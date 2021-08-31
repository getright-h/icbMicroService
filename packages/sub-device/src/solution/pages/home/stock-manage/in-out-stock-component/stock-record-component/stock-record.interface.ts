import { QueryInOutRecordDetailResult } from '~/solution/model/dto/stock-manage.dto';

/**
 * @export state变量定义和初始化
 * @class IStockRecordState
 */
export class IStockRecordState {
  details: QueryInOutRecordDetailResult;
}
/**
 * @export props变量定义和初始化
 * @class IStockRecordProps
 */
export class IStockRecordProps {
  visible: boolean;
  close: () => void;
  id: string;
}
