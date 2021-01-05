import { MenuTreeNode } from '~/solution/model/dto/role-manage.dto';
/**
 * @export state变量定义和初始化
 * @class IRolePrivilegeTabsState
 */
export class IRolePrivilegeTabsState {
  treeData: MenuTreeNode[] = [];
  expandedKeys: string[] = [];
  checkedKeys: string[] = [];
  checkedNodes: MenuTreeNode[] = [];
  isLoading = false;
}
export class IRolePrivilegeTabsProps {
  roleId: string;
  systemId: string;
}
