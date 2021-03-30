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
  checkAllMenu = false; //控制菜单全选
  checkAll = false; // 控制权限全选
}
export class IRolePrivilegeTabsProps {
  roleId: string;
  systemId: string;
}
