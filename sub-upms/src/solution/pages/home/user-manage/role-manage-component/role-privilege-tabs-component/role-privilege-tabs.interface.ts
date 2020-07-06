import { MenuPrivilegeModel, PrivilegeInfo } from '~/solution/model/dto/role-manage.dto';
/**
 * @export state变量定义和初始化
 * @class IRolePrivilegeTabsState
 */
export class IRolePrivilegeTabsState {
  privilegeModelList: MenuPrivilegeModel[];
  customMenuList: PrivilegeMenuItem[];
  checkedValues: PrivilegeInfo[];
  activeCollapses: string[];
  checkedMenuKeys: string[] = [];
  isLoading = false;
}
export class IRolePrivilegeTabsProps {
  roleId: string;
  systemId: string;
}
export interface CheckNodeEvent {
  menuId: string;
  menuName: string;
  checked: boolean;
}
export interface PrivilegeMenuItem {
  menuId: string;
  menuName?: string;
  privilegeList: PrivilegeInfo[];
}
