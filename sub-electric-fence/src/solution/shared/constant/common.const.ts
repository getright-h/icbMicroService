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
    }
  ]
};
