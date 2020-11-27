/**
 * @export state变量定义和初始化
 * @class IPositionMonitorDrawerLeftState
 */
export class IPositionMonitorDrawerLeftState {
  isLoading = false;
  searchForm = {
    index: 1,
    size: 10
  };
  selectedRowKeys: any[] = [];
  tableData: any[] = [
    {
      id: 1,
      name: '1',
      telephone: '1',
      vehicle: '1',
      status: '1',
      isFromOrganization: true,
      locationInfo: {
        coordinates: [116.433322, 39.900256],
        status: true,
        markerInfo: {
          licenceNumber: '186005833',
          identificationNumber: '1122333',
          unitName: '成都爱车宝信息技术有限公司',
          lalg: [116.433322, 39.900256],
          status: false,
          place: '无心思路大大大'
        }
      }
    },
    {
      id: 2,
      name: '1',
      telephone: '1',
      vehicle: '1',
      status: '1',
      isFromOrganization: true,
      locationInfo: {
        coordinates: [116.433322, 39.100256],
        status: false,
        markerInfo: {
          licenceNumber: '186005833',
          identificationNumber: '1122333',
          unitName: '成都爱车宝信息技术有限公司',
          lalg: [116.433322, 39.900256],
          status: true,
          place: '无心思路大大大'
        }
      }
    }
  ];
  total = 0;
}
