export enum ADDRESS_TYPE {
  Province,
  City,
  Area
}

export const PAGE_SIZE = 10;

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
      ]
    },
    {
      path: 'home/baseManage',
      title: '基础管理',
      children: [
        {
          path: 'warehouse',
          title: '仓库设置'
        }
      ]
    },
    {
      path: 'home/voucher/manage',
      title: '安装凭证管理'
    }
  ]
};
