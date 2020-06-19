/**
 * @export state变量定义和初始化
 * @class IISelectLoadingState
 */
export class IISelectLoadingState {
  fetching = false;
  optionList: Array<any> = [];
}
export interface IISelectLoadingProps {
  placeholder: string;
  defaultValue?: string;
  reqUrl: string;
  showSearch?: boolean;
  searchKey?: string;
  searchForm?: Record<string, any>;
  getCurrentSelectInfo: (value: string, option: any) => void;
}
