/**
 * @export state变量定义和初始化
 * @class IOrderDetailState
 */
export class IOrderDetailState {
  tableData: any[] = [];
}
/**
 * @export props变量定义和初始化
 * @class IOrderDetailProps
 */
export class IOrderDetailProps {
  visible: boolean;
  close: () => void;
}
