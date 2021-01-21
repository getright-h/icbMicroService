export function AlarmParameterColumn(callbackAction: Function) {
  return [
    {
      title: '所属监控组',
      dataIndex: 'groupName'
    },
    {
      title: '车主姓名',
      dataIndex: 'ownerName'
    },
    {
      title: '车牌号',
      dataIndex: 'plateNo'
    },
    {
      title: '设备号',
      dataIndex: 'deviceCode'
    },
    {
      title: '设备状态',
      dataIndex: 'statusText'
    },
    {
      title: '车辆里程',
      dataIndex: 'mileage',
      render: (text: string) => text + 'km'
    },
    {
      title: '最后地址',
      dataIndex: 'address',
      render: (text: string) => text || '-'
    },
    {
      title: '所属机构',
      dataIndex: 'organizationName'
    }
  ];
}
