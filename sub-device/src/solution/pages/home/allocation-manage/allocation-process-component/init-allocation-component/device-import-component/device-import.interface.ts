/**
 * @export state变量定义和初始化
 * @class IDeviceImportState
 */
export class IDeviceImportState {
  confirmLoading = false;
  importType: number = null;
}
/**
 * @export props变量定义和初始化
 * @class IDeviceImportProps
 */
export class IDeviceImportProps {
  visible: boolean;
  close: () => void;
}
