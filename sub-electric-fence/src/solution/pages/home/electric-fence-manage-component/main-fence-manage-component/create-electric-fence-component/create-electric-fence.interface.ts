import { FenceManageListReturnModal } from '~/solution/model/dto/fence-manage.dto';
import { Dispatch } from 'react';

/**
 * @export state变量定义和初始化
 * @class ICreateElectricFenceState
 */
export class ICreateElectricFenceState {
  loadingMapArea = false;
  listOfOption: any = undefined;
  isLoading = false;
}

export interface ICreateElectricProps {
  onValueChange: (key: string, value: any) => void;
  circlrR: number;
  isEdit: boolean;
  editData: FenceManageListReturnModal;
  centerPlace: Array<number>;
  polygon: any[];
  //   getCurrentCircleLocation: (location: { lat: number; lng: number }) => void;
  //   onFenceTypeChangeBack: (value: number) => void;
  //   onCrPlaceChangeBack: (value: number | string) => void;
}

export enum FENCETYPENUM {
  CIRCLE = 1,
  POLYGON,
  ADMINISTRATIVEDIVISION
}
