/**
 * @export state变量定义和初始化
 * @class IAreaSearchCarState
 */
export class IAreaSearchCarState {
  isLoading = false;
  pageIndex = 1;
  pageSize = 10;
  tableData: any = [];
  total = 0;
  locationList: any[] = [];
  circleLocation: any[];
  fenceType: FENCE_TYPE_ENUM | null = FENCE_TYPE_ENUM.POLYGON;
  districtAdcode: string | null;
}

export enum FENCE_TYPE_ENUM {
  CIRCLE = 1,
  POLYGON,
  ADMINISTRATIVEDIVISION
}
