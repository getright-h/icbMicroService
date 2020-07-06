import { OrganizationTypeResponse } from '~/solution/model/dto/organization-manage.dto';
import { DataNode } from 'rc-tree/lib/interface';
import { EventDataNode } from 'rc-tree/lib/interface';
/**
 * @export state变量定义和初始化
 * @class IUserLeftState
 */
export class IUserLeftState {
  treeData: NewDataNode[] = [];
}

export interface IUserLeftProps {
  getSelectTreeNode: (node: EventDataNode) => void;
}

export interface NewDataNode extends OrganizationTypeResponse, DataNode {}
