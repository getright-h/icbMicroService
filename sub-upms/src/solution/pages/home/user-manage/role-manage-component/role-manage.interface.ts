import { DataNode } from 'rc-tree/lib/interface';
import { PrivilegeInfo } from '~/solution/model/dto/role-manage.dto';
/**
 * @export state变量定义和初始化
 * @class IRoleManageState
 */
export class IRoleManageState {
  roleList: Array<RoleInfo> = [];
  isLoading = false;
  roleId = '';
  systemId = '';
}

export interface RoleInfo {
  id: string;
  name: string;
  state: boolean;
  code: string;
  originalCode: string;
  systemId: string;
  positionId: string;
}

export interface MenuTreeNode extends DataNode {
  key: string;
  name: string;
  title: string;
  children?: MenuTreeNode[];
}
