import { Factory } from 'react';

/**
 * @export state变量定义和初始化
 * @class IDrapChooseState
 */
export class IDrapChooseState {
  optionList: Array<any> = [];
  fetching = false;
  value: string | undefined;
}

export interface IDrapChooseProps {
  placeholder?: string;
  getCurrentSelectInfo?: (value: SelectInfo) => void;
  reqUrl?: string;
  params?: Record<string, any>;
  defaultValue?: string | undefined;
  seachKey?: string;
  type?: number;
  showSearch?: boolean;
  isDisable?: boolean;
}
export interface SelectInfo {
  title: string;
  value: string;
}
