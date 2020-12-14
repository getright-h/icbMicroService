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
}
export enum ModalType {
  CUSTOM,
  FORM
}
