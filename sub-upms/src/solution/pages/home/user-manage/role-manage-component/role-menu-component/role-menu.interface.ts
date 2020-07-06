import { MenuTreeNode } from '~/solution/model/dto/role-manage.dto';

/**
 * @export state变量定义和初始化
 * @class IRoleMenuState
 */
export class IRoleMenuState {
  treeData: MenuTreeNode[] = [];
  expandedKeys: string[] = [];
}
export interface IRoleMenuProps {
  systemId: string;
  checkedKeys: string[];
  getCheckedNodes: (checkedKeys: string[], e: any) => void;
}
