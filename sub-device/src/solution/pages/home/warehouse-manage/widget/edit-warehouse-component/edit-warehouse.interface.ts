/**
 * @export state变量定义和初始化
 * @class IEditWarehouseState
 */
export class IEditWarehouseState {
  confirmLoading = false;
}
/**
 * @export props变量定义和初始化
 * @class IEditWarehouseProps
 */
export class IEditWarehouseProps {
  visible: boolean;
  close: () => void;
  id: string;
}
