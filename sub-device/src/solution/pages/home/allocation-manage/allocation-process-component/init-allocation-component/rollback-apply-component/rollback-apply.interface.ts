/**
 * @export state变量定义和初始化
 * @class IRollbackApplyState
 */
export class IRollbackApplyState {
  confirmLoading = false;
  opinion: number = null;
}
/**
 * @export props变量定义和初始化
 * @class IRollbackApplyProps
 */
export class IRollbackApplyProps {
  visible: boolean;
  close: () => void;
}
