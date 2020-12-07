/**
 * @export state变量定义和初始化
 * @class IAlarmParameterState
 */

import { IDirectiveReturn } from '~model/dto/drap-choose-loading.dto';
export interface IDirectiveModalProps {
  visible: boolean;
  close: Function;
}
export class IDirectiveModalState {
  custom = false;
  isDevice = true;
  isParams = true;
  currentIndex = -1;
  currentDirective: IDirectiveReturn = {};
}
export enum ModalType {
  CUSTOM,
  FORM
}
