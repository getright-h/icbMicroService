import { FenceManageDistrictReturnModal } from '~/solution/model/dto/fence-manage.dto';

/**
import CreateBindCarComponent from '../../../pages/home/electric-fence-manage-component/monitoring-object-component/create-bind-car-component/create-bind-car.component';
 * @export state变量定义和初始化
 * @class ISelectAddressState
 */
export class ISelectAddressState {
  city: Array<FenceManageDistrictReturnModal>;
  province: Array<FenceManageDistrictReturnModal>;
  area: Array<FenceManageDistrictReturnModal>;
}

export const enum ADDRESSINFO {
  PROVINCE = 'province',
  CITY = 'city',
  AREA = 'area'
}
