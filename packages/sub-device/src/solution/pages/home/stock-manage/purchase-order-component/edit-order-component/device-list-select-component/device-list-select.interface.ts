import { FormListFieldData } from 'antd/lib/form/FormList';
import { DeviceListItem } from '~/solution/model/dto/stock-manage.dto';

/**
 * @export state变量定义和初始化
 * @class IDeviceListSelectState
 */
export class IDeviceListSelectState {
  editTypeName = '';
}

export class IDeviceListSelectProps {
  field: FormListFieldData;
  index: number;
  add: () => void;
  remove: (index: number) => void;
  defaultInfo: DeviceListItem;
  handleDeviceChange: (typeName: string, option: any) => void;
}
