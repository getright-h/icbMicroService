import { DllThingReturn, VehicleBindParams } from '~/solution/model/dto/monitor-object-service.dto';
import { FenceManageListReturnModal } from '~/solution/model/dto/fence-manage.dto';
import { FormInstance } from 'antd/lib/form';

/**
 * @export state变量定义和初始化
 * @class ICreateBindCarState
 */
export class ICreateBindCarState {
  fetching = false;
  searchDataList: DllThingReturn[];
  searchFenceList: FenceManageListReturnModal[];
}

export interface ICreateBindCarProps {
  formInitValue?: VehicleBindParams;
  onValuesChange?: (form: FormInstance) => void;
}
