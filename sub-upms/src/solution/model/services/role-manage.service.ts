import { RoleManageDTO, QueryRoleListParam, RoleInfo, MenuRelationParam, MenuTreeNode } from '../dto/role-manage.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

const QUERY_ROLE_LIST = 'prvilege/common/queryRoleList';
const GET_MENU_TREE = 'prvilege/common/menuTree';
const SUBMIT_MENU_RELATION = 'prvilege/common/submitMenuRelation';

@DepUtil.Injectable()
export class RoleManageService extends RoleManageDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  // 查询角色列表
  queryRoleList(params: QueryRoleListParam): Observable<Array<RoleInfo>> {
    return this.requestService.get(QUERY_ROLE_LIST, params);
  }

  // 获取菜单列表
  getMenuTree(params: { systemId: string; roleId: string }): Observable<Array<MenuTreeNode>> {
    return this.requestService.get(GET_MENU_TREE, params);
  }

  // 绑定角色、菜单、权限关系
  submitMenuRelation(params: MenuRelationParam): Observable<boolean> {
    return this.requestService.post(SUBMIT_MENU_RELATION, params);
  }
}
