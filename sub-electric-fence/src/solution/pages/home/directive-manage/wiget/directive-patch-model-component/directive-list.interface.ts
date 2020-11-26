/**
 * @export state变量定义和初始化
 * @class IAlarmParameterState
 */
export interface IDirectiveModalProps {
  visible: boolean;
  close: Function;
}
export class IDirectiveModalState {
  custom = false;
  isDevice = true;
  isParams = true;
  currentIndex = -1;
}
export enum ModalType {
  CUSTOM,
  FORM
}
