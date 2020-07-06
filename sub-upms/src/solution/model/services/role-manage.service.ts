import {
  RoleManageDTO,
  QueryRoleListParam,
  RoleInfoResponse,
  PrivilegeInfo,
  MenuTreeNode,
  RoleMenuPrivilegeDetail,
  MenuPrivilegeModel
} from '../dto/role-manage.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

const QUERY_ROLE_LIST = 'prvilege/common/queryRoleList';
const GET_MENU_PRIVILEGE_LIST = 'prvilege/common/menuPrivilegeList';
const GET_MENU_TREE = 'prvilege/common/menuTree';
const ROLE_MENU_PRIVILEGE_DETAIL = 'prvilege/common/roleMenuPrivilegeDetail';
const SUBMIT_MENU_RELATION = 'prvilege/common/submitMenuRelation';
const GET_SYSTEM_PRIVILEGES = 'prvilege/GetAllPrivileges';

@DepUtil.Injectable()
export class RoleManageService extends RoleManageDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  // 查询角色列表
  queryRoleList(params: QueryRoleListParam): Observable<Array<RoleInfoResponse>> {
    return this.requestService.get(QUERY_ROLE_LIST, params);
  }

  // 根据菜单获取权限列表
  getMenuPrivilegeList(menuId: string): Observable<Array<PrivilegeInfo>> {
    return this.requestService.get(GET_MENU_PRIVILEGE_LIST, { menuId });
  }

  // 获取菜单列表
  getMenuTree(systemId: string): Observable<Array<MenuTreeNode>> {
    return this.requestService.get(GET_MENU_TREE, { systemId });
  }

  // 角色、菜单、权限绑定关系详情
  getRoleMenuPrivilegeDetail(roleId: string): Observable<RoleMenuPrivilegeDetail> {
    return this.requestService.get(ROLE_MENU_PRIVILEGE_DETAIL, { roleId });
  }

  // 绑定角色、菜单、权限关系
  submitMenuRelation(params: RoleMenuPrivilegeDetail): Observable<boolean> {
    return this.requestService.post(SUBMIT_MENU_RELATION, params);
  }

  // 获取系统所有可选权限
  getSystemPrivileges(systemId: string): Observable<Array<MenuPrivilegeModel>> {
    return this.requestService.get(GET_SYSTEM_PRIVILEGES, { systemId });
  }
}
