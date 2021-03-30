import { QueryStockDeviceDetailResult } from '~/solution/model/dto/stock-manage.dto';

/**
 * @export state变量定义和初始化
 * @class IDeviceEditState
 */
export class IDeviceEditState {
  confirmLoading = false;
  isEdit = false;
  details: QueryStockDeviceDetailResult;
  formData = {
    purchaseCode: '',
    purchaseName: '',
    typeName: '',
    storePositionName: ''
  };
}
/**
 * @export props变量定义和初始化
 * @class IDeviceEditProps
 */
export class IDeviceEditProps {
  id: string;
  visible: boolean;
  close: (isSuccess?: boolean) => void;
}
