import { UploadFile } from 'antd/lib/upload/interface';
import { DeviceListItem } from '~/solution/model/dto/stock-manage.dto';

/**
 * @export state变量定义和初始化
 * @class IEditOrderState
 */
export class IEditOrderState {
  confirmLoading = false;
  editSupplierName = '';
  editPurchaseTime: string;
  editDeviceList: DeviceListItem[] = [];
  imageList: any[] = [];
}
/**
 * @export props变量定义和初始化
 * @class IEditOrderProps
 */
export class IEditOrderProps {
  id: string;
  visible: boolean;
  close: (isSuccess?: boolean) => void;
}
