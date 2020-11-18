import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';

const MODULE_PATH = 'home/approvalManage';
export const approvalManageRoutes: IRoute[] = [
  {
    path: `${MODULE_PATH}/approvalManage`,
    component: ROUTERS.approvalManage,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/approveTemplate`,
    component: ROUTERS.approvalTemplate,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/addTemplate/:id/:isEdit`,
    component: ROUTERS.addTemplate,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/approvalManageDetail/:id/:isDeal`,
    component: ROUTERS.approvalManageDetail,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/approvalTemplateFormModal/:id/:groupName/:groupId`,
    component: ROUTERS.approvalTemplateFormModal,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/approvalEditTemplateFormModal/:id/:isEdit`,
    component: ROUTERS.approvalTemplateFormModal,
    lazyload: true,
    exact: true
  }
];
