/**
 * @export state变量定义和初始化
 * @class IAlarmParameterState
 */
export interface IDirectiveModalProps {
  visible: boolean;
  close: Function;
}
export enum ModalType {
  CREATE,
  EDIT
}
