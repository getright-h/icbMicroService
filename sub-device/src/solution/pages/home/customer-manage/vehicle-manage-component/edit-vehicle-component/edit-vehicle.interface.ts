import { OwnerInfo, VehicletypeResType } from '~/solution/model/dto/customer-manage.dto';
import { VehicleLayout } from '~/solution/model/dto/customer-manage.dto';

/**
 * @export state变量定义和初始化
 * @class IEditVehicleState
 */
export class IEditVehicleState {
  id: string;
  isEdit = false;
  createUserType = 1;
  imageList: any[] = [];
  extraFormData = {
    financeName: '',
    distributorName: '',
    brandId: '',
    factoryId: '',
    versionId: '',
    configId: ''
  };
  vehicleCode = {
    brandCode: '',
    factoryCode: '',
    versionCode: ''
  };
  bindedDeviceList: any[] = [];
  ownerInfo: OwnerInfo;
  vehicleBrandList: VehicleLayout[] = [];
  vehicleFactoryList: VehicleLayout[] = [];
  vehicleVersionList: VehicleLayout[] = [];
  vehicleConfigList: VehicleLayout[] = [];
  vehicleTypeList: VehicletypeResType[] = [];
  confirmLoading = false;
  isUnbindDevice = false;
  unbindInfo: any;
}
