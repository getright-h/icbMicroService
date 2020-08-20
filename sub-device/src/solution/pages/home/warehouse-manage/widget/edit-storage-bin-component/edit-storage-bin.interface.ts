/**
 * @export state变量定义和初始化
 * @class IEditStorageBinState
 */
export class IEditStorageBinState {
  confirmLoading = false;
}
/**
 * @export props变量定义和初始化
 * @class IEditStorageBinProps
 */
export class IEditStorageBinProps {
  visible: boolean;
  close: () => void;
  id: string;
}
