/**
 * @export state变量定义和初始化
 * @class IStockDeviceState
 */
export class IStockDeviceState {
  tableData: any[] = [];
}
/**
 * @export props变量定义和初始化
 * @class IStockDeviceProps
 */
export class IStockDeviceProps {
  visible: boolean;
  close: () => void;
  id: string;
}
