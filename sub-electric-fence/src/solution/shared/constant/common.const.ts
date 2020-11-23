export enum ADDRESS_TYPE {
  Province,
  City,
  Area
}

export const PAGESIZE = 10;

export const PAGES_MENU = {
  MENU: [
    {
      path: 'home/fence',
      title: '电子围栏',
      icon: 'container',
      children: [
        {
          path: 'mainfence',
          title: '围栏管理',
          icon: 'container'
        },
        {
          path: 'fenceAttention',
          title: '围栏告警',
          icon: 'container'
        },
        {
          path: 'monitoringObject',
          title: '监控对象',
          icon: 'container'
        }
      ]
    },
    {
      path: 'home/alarm',
      title: '监控管理',
      icon: 'container',
      children: [
        {
          path: 'parameter',
          title: '报警参数管理'
        },
        {
          path: 'config',
          title: '报警配置管理'
        }
      ]
    },
    {
      path: 'home/positionMonitor',
      title: '定位监控',
      icon: 'container'
    },
    {
      path: 'home/directive',
      title: '指令中心',
      icon: 'container',
      children: [
        {
          path: 'directiveList',
          title: '指令列表'
        }
      ]
    },
    {
      path: 'home/report',
      title: '报表',
      icon: 'container',
      children: [
        {
          path: 'statistical',
          title: '报警统计表'
        },
        {
          path: 'record',
          title: '报警记录'
        },
        {
          path: 'odometer',
          title: '行驶里程表'
        },
        {
          path: 'state',
          title: '设备状态统计表'
        },
        {
          path: 'offline',
          title: '离线设备统计'
        },
        {
          path: 'dwell',
          title: '设备停留点统计'
        },
        {
          path: 'permanent',
          title: '常驻点统计'
        }
      ]
    }
  ]
};
