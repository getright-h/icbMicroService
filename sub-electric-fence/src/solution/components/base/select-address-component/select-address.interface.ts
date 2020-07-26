import { FenceManageDistrictReturnModal, District } from '~/solution/model/dto/fence-manage.dto';

/**
import CreateBindCarComponent from '../../../pages/home/electric-fence-manage-component/monitoring-object-component/create-bind-car-component/create-bind-car.component';
 * @export state变量定义和初始化
 * @class ISelectAddressState
 */
export class ISelectAddressState {
  citys?: Array<FenceManageDistrictReturnModal>;
  provinces?: Array<FenceManageDistrictReturnModal>;
  districts?: Array<FenceManageDistrictReturnModal>;
  city: string;
  province: string;
  district: string;
}

export interface ISelectAddressProps {
  getAddressInfo: (value: ISelectAddressState) => void;
  initValue: District;
}

export const enum ADDRESSINFO {
  PROVINCE = 'province',
  CITY = 'city',
  AREA = 'district'
}
