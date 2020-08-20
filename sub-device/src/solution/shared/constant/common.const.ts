export enum ADDRESS_TYPE {
  Province,
  City,
  Area
}

export const PAGES_MENU = {
  MENU: [
    {
      path: 'home/stock',
      title: '库存管理',
      children: [
        {
          path: 'all',
          title: '全部设备管理'
        },
        {
          path: 'purchase',
          title: '采购单管理'
        },
        {
          path: 'in-out',
          title: '出入库管理'
        }
      ]
    },
    {
      path: 'home/allocation',
      title: '设备调拨',
      children: [
        {
          path: 'manage',
          title: '调拨单'
        },
        {
          path: 'process',
          title: '调拨流程'
        }
        // 调拨模板已移入基础设置
        // {
        //   path: 'template',
        //   title: '调拨模板'
        // }
      ]
    },
    {
      path: 'home/warehouse',
      title: '仓库管理'
    }
  ]
};
