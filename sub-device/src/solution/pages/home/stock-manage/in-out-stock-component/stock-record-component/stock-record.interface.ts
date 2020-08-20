/**
 * @export state变量定义和初始化
 * @class IStockRecordState
 */
export class IStockRecordState {
  details: any;
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
