import { Observable } from 'rxjs';
import { DataNode } from 'rc-tree/lib/interface';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class RoleManageDTO {
  // 你的抽象方法，具体在 Service 中实现
  abstract queryRoleList(params: QueryRoleListParam): Observable<Array<RoleInfoResponse>>;
  abstract getMenuPrivilegeList(menuId: string): Observable<Array<PrivilegeInfoResponse>>;
  abstract getMenuTree(systemId: string): Observable<Array<MenuTreeNode>>;
  abstract getRoleMenuPrivilegeDetail(roleId: string): Observable<RoleMenuPrivilegeDetail>;
  abstract submitMenuRelation(params: RoleMenuPrivilegeDetail): Observable<boolean>;
}

// 示例 Dto
export interface QueryRoleListParam {
  systemId: string;
  userId: string;
}

// 响应 Dto
export interface RoleInfoResponse {
  id: string;
  name: string;
  state: boolean;
  code: string;
  originalCode: string;
  systemId: string;
}
export interface PrivilegeInfoResponse {
  privilegeId: string;
  privilegeCode: string;
}

export interface MenuTreeNode extends DataNode {
  key: string;
  name: string;
  title: string;
  children?: MenuTreeNode[];
}
export interface RoleMenuPrivilegeDetail {
  roleId: string;
  menuList: MenuList[];
  systemId: string;
}

interface MenuList {
  menuId: string;
  privilegeList: PrivilegeInfoResponse[];
}
