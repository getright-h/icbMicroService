import { DataNode, EventDataNode } from 'antd/lib/tree';
import { OrganizationInfo } from '~/solution/model/dto/organization-tree.dto';

/**
 * @export state变量定义和初始化
 * @class IStockManageLeftState
 */
export class IStockManageLeftState {
  treeData: NewDataNode[] = [];
}
export class IStockManageLeftProps {
  getSelectTreeNode: (node: EventDataNode) => void;
}

export interface NewDataNode extends OrganizationInfo, DataNode {}
