import { Observable } from 'rxjs';
import { DataNode } from 'rc-tree/lib/interface';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class RoleManageDTO {
  // 你的抽象方法，具体在 Service 中实现
  abstract queryRoleList(params: QueryRoleListParam): Observable<Array<RoleInfo>>;
  abstract getMenuPrivilegeList(menuId: string): Observable<Array<PrivilegeInfo>>;
  abstract getMenuTree(systemId: string): Observable<Array<MenuTreeNode>>;
  abstract getRoleMenuPrivilegeDetail(roleId: string): Observable<RoleMenuPrivilegeDetail>;
  abstract submitMenuRelation(params: RoleMenuPrivilegeDetail): Observable<boolean>;
  abstract getSystemPrivileges(systemId: string): Observable<Array<MenuPrivilegeModel>>;
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
  children?: MenuTreeNode[];
}
export interface RoleMenuPrivilegeDetail {
  roleId: string;
  menuList: MenuList[];
  systemId: string;
}

interface MenuList {
  menuId: string;
  privilegeList: PrivilegeInfo[];
}

export interface PrivilegeInfo {
  privilegeId: string;
  privilegeCode: string;
}

export interface MenuPrivilegeModel {
  privileges: PrivilegeModel[];
  id: string;
  name: string;
}

interface PrivilegeModel {
  id: string;
  code: string;
  originalCode: string;
  name: string;
  groupId: string;
  instruction: string;
  createTime: string;
  updateTime: string;
  privileges: PrivilegeModel[];
}
