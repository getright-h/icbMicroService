export function AlarmParameterColumn(callbackAction: Function) {
  const render = (text: any) => (text ? text : '-');

  return [
    {
      title: '所属监控组',
      dataIndex: 'groupName',
      render
    },
    {
      title: '车主姓名',
      dataIndex: 'ownerName',
      render
    },
    {
      title: '车牌号',
      dataIndex: 'plateNo',
      render
    },
    {
      title: '设备号',
      dataIndex: 'deviceCode',
      render
    },
    {
      title: '设备状态',
      dataIndex: 'statusText',
      render
    },
    {
      title: '定位时间',
      dataIndex: 'locateTime',
      render
    },
    {
      title: '在线时间',
      dataIndex: 'statusTime',
      render
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
      dataIndex: 'organizationName',
      render
    }
  ];
}
