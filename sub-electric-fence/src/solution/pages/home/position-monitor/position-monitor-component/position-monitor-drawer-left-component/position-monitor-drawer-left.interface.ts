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
      children: [
        {
          id: 44,
          deviceName: '设备号',
          deviceNumber: '设备型号',
          statusText: '在线',
          status: true,
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
          id: 55,
          deviceName: '设备号2',
          deviceNumber: '设备型号2',
          statusText: '在线2',
          status: true,
          locationInfo: {
            coordinates: [116.433322, 39.800256],
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
        }
      ]
    },
    {
      id: 2,
      name: '1',
      telephone: '1',
      vehicle: '1',
      status: '1',
      isFromOrganization: true,
      children: [
        {
          id: 22,
          deviceName: '设备号',
          deviceNumber: '设备型号',
          statusText: '在线',
          status: true,
          locationInfo: {
            coordinates: [116.433322, 37.900256],
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
          id: 33,
          deviceName: '设备号2',
          deviceNumber: '设备型号2',
          statusText: '在线2',
          status: true,
          locationInfo: {
            coordinates: [116.433322, 36.800256],
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
        }
      ]
    }
  ];
  total = 0;
}
