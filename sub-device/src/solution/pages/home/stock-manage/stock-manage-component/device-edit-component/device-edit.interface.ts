/**
 * @export state变量定义和初始化
 * @class IDeviceEditState
 */
export class IDeviceEditState {
  confirmLoading = false;
  isEdit = false;
}
/**
 * @export props变量定义和初始化
 * @class IDeviceEditProps
 */
export class IDeviceEditProps {
  visible: boolean;
  close: () => void;
}
