import { DataNode, EventDataNode } from 'rc-tree/lib/interface';
import { Key, ReactNode } from 'react';
/**
 * @export state变量定义和初始化
 * @class IOrganizationControllerState
 */
export class IOrganizationControllerState {
  loadStoreOrganizationParams = {
    typeId: 'c59c75eec2d3cc075cca08d84386bcb9',
    id: ''
  };
  treeData: DataNode[] = [];
}

export class IOrganizationControllerProps {
  warehouseAction?: (element?: any) => ReactNode;
  onSelect?: (selectedKeys?: Key[], e?: { node: EventDataNode }) => void;
  expandedKeys?: string[];
  currentOrganazation?: string = '';
  checkedKeys?: string[];
  organizationChecked?: boolean;
  checkable?: boolean;
  treeSelectedKeys?: string[];
  onExpand?: (expandedKeys: string[]) => void;
  queryChildInfo?: any;
  getCheckedInfo?: (treeData: DataNode[], checkedKeys?: []) => void;
  allCanSelect?: boolean = false;
  isGroup?: boolean;
}

export const TREE_MAP = {
  title: 'name',
  key: 'id'
};

export interface OrganizationExportFunction {
  deleteCurrentTreeData?: (id?: string) => void;
  queryOrganizationTypeListByTypeId?: (id?: string) => void;
}