/**
 * @export state变量定义和初始化
 * @class IVoucherEditState
 */
export class IVoucherEditState {
  confirmLoading = false;
  isEdit = false;
  pictureList: any[] = [];
  deviceCodeList: string[] = [];
}
/**
 * @export props变量定义和初始化
 * @class IVoucherEditProps
 */
export class IVoucherEditProps {
  id: string;
  visible: boolean;
  close: (isSuccess?: boolean) => void;
}
