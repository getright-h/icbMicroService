import { DataNode } from 'rc-tree/lib/interface';
import { RoleInfo } from '~/solution/model/dto/role-manage.dto';
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

export interface MenuTreeNode extends DataNode {
  key: string;
  name: string;
  title: string;
  children?: MenuTreeNode[];
}
