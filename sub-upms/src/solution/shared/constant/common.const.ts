export enum ADDRESS_TYPE {
  Province,
  City,
  Area
}

export const PAGES_MENU = {
  MENU: [
    {
      path: 'account',
      title: '账号管理',
      children: [
        {
          path: 'organizationManage',
          title: '机构管理'
        },
        {
          path: 'userManage',
          title: '用户管理'
        },
        {
          path: 'roleManage',
          title: '角色管理'
        },
        {
          path: 'departmentManage',
          title: '部门管理'
        },
        {
          path: 'stationManage',
          title: '岗位管理'
        }
      ]
    }
  ]
};
