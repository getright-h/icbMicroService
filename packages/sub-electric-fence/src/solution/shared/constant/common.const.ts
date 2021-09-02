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
      icon: 'project',
      children: [
        {
          path: 'mainfence',
          title: '围栏管理',
          icon: 'project'
        },
        {
          path: 'fenceAttention',
          title: '围栏告警',
          icon: 'project'
        },
        {
          path: 'monitoringObject',
          title: '监控对象',
          icon: 'project'
        }
      ]
    },
    {
      path: 'home/alarm/parameter',
      title: '参数管理',
      icon: 'project'
    },
    {
      path: 'home/positionMonitor',
      title: '定位监控',
      icon: 'project'
    },
    {
      path: 'home/directive',
      title: '指令中心',
      icon: 'project',
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
      icon: 'project',
      children: [
        {
          path: 'statistical',
          title: '报警统计表'
        },
        {
          path: 'record',
          title: '报警记录表'
        },
        {
          path: 'follow',
          title: '报警跟进表'
        },
        {
          path: 'monitor',
          title: '监控组报表'
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
    },
    {
      path: 'home/dataScreen',
      title: '可视化'
    }
  ]
};
