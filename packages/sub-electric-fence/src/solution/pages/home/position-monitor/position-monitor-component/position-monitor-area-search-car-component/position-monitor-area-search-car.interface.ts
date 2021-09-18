/**
 * @export state变量定义和初始化
 * @class IPositionMonitorAreaSearchCarState
 */
export class IPositionMonitorAreaSearchCarState {
  AreaSearchCarDrawervisible = true;
  isLoading = false;
  showTable = true;
  searchForm = {
    index: 1,
    size: 10
  };
  tableData: Array<any> = [];
  total = 0;
}

export interface IPositionMonitorAreaSearchCarProps {
  mapbtnSearchCarVisible: boolean;
  closeMapSearchCarbtnPage: () => void;
}
