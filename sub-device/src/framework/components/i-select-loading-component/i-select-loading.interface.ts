/**
 * @export state变量定义和初始化
 * @class IISelectLoadingState
 */
export class IISelectLoadingState {
  fetching = false;
  optionList: Array<any> = [];
  value: string;
}
export interface IISelectLoadingProps {
  placeholder: string;
  isData?: boolean;
  width?: number | string;
  mode?: "multiple" | "tags";
  allowClear?: boolean;
  className?: string;
  selectedValue?: string;
  reqUrl: string;
  disabled?: boolean;
  searchForm?: Record<string, any>;
  getCurrentSelectInfo?: (value: string, option: any) => void;
  searchKey?: string;
  showSearch?: boolean;
  pageSize?: number;
  dropdownMatchSelectWidth?: boolean | number;
  searchKeyName?: string;
}
