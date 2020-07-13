import { FenceManageListReturnModal } from '~/solution/model/dto/fence-manage.dto';

/**
 * @export state变量定义和初始化
 * @class ICreateElectricFenceState
 */
export class ICreateElectricFenceState {
  loadingMapArea = false;
  listOfOption: any = undefined;
}

export interface ICreateElectricProps {
  onValueChange: (key: string, value: any) => void;
  circlrR: number;
  editData: FenceManageListReturnModal;
  centerPlace: Array<number>;
  //   getCurrentCircleLocation: (location: { lat: number; lng: number }) => void;
  //   onFenceTypeChangeBack: (value: number) => void;
  //   onCrPlaceChangeBack: (value: number | string) => void;
}

export enum FENCETYPENUM {
  CIRCLE,
  POLYGON,
  ADMINISTRATIVEDIVISION
}
