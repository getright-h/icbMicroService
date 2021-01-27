/**
 * @export state变量定义和初始化
 * @class IAddDeviceTypeState
 */
import { IAddDeviceTypeDTO } from '~model/dto/device-type.dto';
export class IAddDeviceTypeState {
  imageList: any[] = [];
  typeList: any[] = [];
  searchForm: IAddDeviceTypeDTO = {};
  submitLoading: boolean;
  visible: boolean;
}

export interface IAddDeviceType {
  visible: boolean;
  fetchData: Function;
  close: Function;
  data: any;
}
