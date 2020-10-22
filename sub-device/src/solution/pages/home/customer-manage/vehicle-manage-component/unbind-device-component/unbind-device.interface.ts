/**
 * @export state变量定义和初始化
 * @class IUnbindDeviceState
 */
export class IUnbindDeviceState {
  confirmLoading = false;
  unbindType = 0; // 0 直接解绑，1 解绑入库
}
/**
 * @export props变量定义和初始化
 * @class IUnbindDeviceProps
 */
export class IUnbindDeviceProps {
  visible: boolean;
  close: () => void;
}
