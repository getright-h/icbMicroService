/**
 * @export state变量定义和初始化
 * @class IAlarmParameterState
 */

import { IDirectiveReturn } from '~model/dto/drap-choose-loading.dto';
import { AlarmPackageContent } from '~/solution/model/dto/alarm-manage.dto';

export enum Type {
  Deivce = 1,
  MonitorGroup = 2
}
export enum ModalType {
  CUSTOM,
  FORM
}

export interface IDirectiveModalProps {
  visible: boolean;
  deviceId?: string;
  close: Function;
}
export class IDirectiveModalState {
  custom = false;
  isDevice = Type.Deivce;
  isParams = true;
  confirmLoading = false;
  currentIndex = -1;
  currentDirective: IDirectiveReturn = {};
  currentDirectiveTempalet: any[] = [];
  tempalteValue: AlarmPackageContent[] = [];
  currentDirectiveTemObj: AlarmPackageContent = {};
  currentTempalte: AlarmPackageContent = {};
  editParam = false;
}

export interface ISendCode {
  type?: number; // 类型（1：设备号，2：监控组） ,
  codes?: Array<any>; // 设备号 ,
  vehicleGroupId?: string; // 监控组id ,
  cmdCode?: string; // 指令码 ,
  cmdName?: string; // 指令名称 ,
  cmdValue?: string; // 指令内容 ,
  switch?: boolean; //打开、关闭
  verifyCode?: string;
}
