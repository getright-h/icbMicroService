import { MenuPrivilegeModel, PrivilegeInfo } from '~/solution/model/dto/role-manage.dto';
import { PrivilegeMenuItem, CheckNodeEvent } from '../role-manage.interface';
/**
 * @export state变量定义和初始化
 * @class IRolePrivilegeTabsState
 */
export class IRolePrivilegeTabsState {
  privilegeModelList: MenuPrivilegeModel[];
  customMenuList: PrivilegeMenuItem[] = [];
  checkedValues: string[];
  activeCollapses: string[];
}
export class IRolePrivilegeTabsProps {
  systemId: string;
  menuList: PrivilegeMenuItem[];
  checkNodeEvent: CheckNodeEvent;
  getSubmitMenuList: (menuList: PrivilegeMenuItem[]) => void;
}
