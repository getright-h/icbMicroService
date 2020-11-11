import { DeviceListItem } from '~/solution/model/dto/stock-manage.dto';
import { FormListFieldData } from 'antd/lib/form/FormList';

/**
 * @export state变量定义和初始化
 * @class IAssignDeviceState
 */
export class IAssignDeviceState {}
export class IAssignDeviceStateProps {
  handleDeviceChange: (typeName: string) => void;
}

export interface ITypeInfo {
  typeId: string;
  typeName: string;
  number: number;
  onlyShow: true;
}
