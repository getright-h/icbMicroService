export const ROUTERS = {
  login: () => import('~/solution/pages/login/login.module'),
  home: () => import('~/solution/pages/home/home.module'),
  organizationManage: () => import('~/solution/pages/home/organization-manage-component/organization-manage.component'),
  addOrganization: () =>
    import('~/solution/pages/home/organization-manage-component/add-organization-component/add-organization.component'),
  userManageModule: () => import('~/solution/pages/home/user-manage/user-manage.module'),
  userManage: () => import('~/solution/pages/home/user-manage/user-manage-component/user-manage.component'),
  roleManage: () => import('~/solution/pages/home/user-manage/role-manage-component/role-manage.component'),
  stationManage: () => import('~/solution/pages/home/user-manage/station-manage-component/station-manage.component'),
  departmentManage: () =>
    import('~/solution/pages/home/user-manage/department-manage-component/department-manage.component'),
  addUser: () => import('~/solution/pages/home/user-manage/user-manage-component/add-user-component/add-user.component')
};
