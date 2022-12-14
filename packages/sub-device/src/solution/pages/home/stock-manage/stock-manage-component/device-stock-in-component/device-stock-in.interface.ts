/**
 * @export state变量定义和初始化
 * @class IDeviceStockInState
 */
export class IDeviceStockInState {
  confirmLoading = false;
  formData = {
    typeName: '',
    purchaseCode: '',
    storePositionName: ''
  };
  errorList: any[] = [];
  isErrorListVisible = false;
  isExitWrongData = false;
  deviceImportList: any[] = [];
  importType = 1;
}
/**
 * @export props变量定义和初始化
 * @class IDeviceStockInProps
 */
export class IDeviceStockInProps {
  visible: boolean;
  close: (isSuccess: boolean) => void;
}
