import { Observable } from 'rxjs';
import { DataNode } from 'rc-tree/lib/interface';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class RoleManageDTO {
  // 你的抽象方法，具体在 Service 中实现
  abstract queryRoleList(params: QueryRoleListParam): Observable<Array<RoleInfo>>;
  abstract getMenuTree(params: { systemId: string; roleId: string }): Observable<Array<MenuTreeNode>>;
  abstract submitMenuRelation(params: MenuRelationParam): Observable<boolean>;
}

// 示例 Dto
export interface QueryRoleListParam {
  systemId: string;
  userId?: string;
}

// 响应 Dto
export interface RoleInfo {
  id: string;
  name: string;
  state: boolean;
  code: string;
  originalCode: string;
  systemId: string;
}

export interface MenuTreeNode extends DataNode {
  key: string;
  name: string;
  title: string;
  isMenuSelected: boolean;
  children?: MenuTreeNode[];
  privilegeGroupList?: PrivilegeGroup[];
}

export interface PrivilegeGroup {
  menuId: string;
  groupId: string;
  groupName: string;
  selectAll?: boolean;
  privilegeList: PrivilegeItem[];
}

export interface PrivilegeItem {
  privilegeId: string;
  privilegeCode: string;
  privilegeName: string;
  isSelected: boolean;
}

export interface MenuRelationParam {
  roleId: string;
  menuList: MenuRelationItem[];
  systemId: string;
}

export interface MenuRelationItem {
  menuId: string;
  menuName: string;
  privilegeList: PrivilegeItem[];
}
