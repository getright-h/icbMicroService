/**
 * @export state变量定义和初始化
 * @class IISelectDeviceState
*/
export class IISelectDeviceState {
  fetching = false;
  optionList: Array<any> = [];
  value: string;
}
export interface IISelectDeviceProps {
  placeholder: string;
  selectedValue?: string;
  disabled?: boolean;
  searchForm?: Record<string, any>;
  getCurrentSelectInfo: (value: string, option: any) => void;
  searchKey?: string;
  showSearch?: boolean;
}