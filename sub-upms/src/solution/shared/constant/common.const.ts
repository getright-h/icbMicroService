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
      icon: 'container',
      children: [
        {
          path: 'organizationManage',
          title: '机构管理',
          icon: 'container'
        },
        {
          path: 'userManage',
          title: '用户管理',
          icon: 'container',
          children: [
            {
              path: 'main',
              title: '用户管理',
              icon: 'container'
            },
            {
              path: 'roleManage',
              title: '角色管理',
              icon: 'container'
            },
            {
              path: 'departmentManage',
              title: '部门管理',
              icon: 'container'
            },
            {
              path: 'stationManage',
              title: '岗位管理',
              icon: 'container'
            }
          ]
        }
      ]
    }
  ]
};
