import { DataNode, EventDataNode } from 'rc-tree/lib/interface';
import { Key, ReactNode } from 'react';
/**
 * @export state变量定义和初始化
 * @class IOrganizationControllerState
 */
export class IOrganizationControllerState {
  loadStoreOrganizationParams = {
    typeId: process.env.TYPE_ID,
    id: '',
    index: 1,
    size: 10
  };
  loading = false;
  treeData: DataNode[] = [];
  loadedKeys: Key[] = [];
  total = 0;
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
  isGroup?: boolean;
  disableNodeObj?: {
    currentDisableId?: string; // 当前监控组ID
    currentCheckedId?: string;
  };
  allCanSelect?: boolean = false;
}

export const TREE_MAP = {
  title: 'name',
  key: 'id'
};

export interface OrganizationExportFunction {
  setSingleCheckTreeData?: (id: string) => void;
  appendNewNodeToCurrentTreeData?: (data: object) => void;
  alertCurrentTreeData?: (id: string, title: string) => void;
  deleteCurrentTreeData?: (id?: string) => void;
  setSingleCheck?: (id?: string) => void;
  queryOrganizationTypeListByTypeId?: (id?: string) => void;
  searchCurrentSelectInfo?: any;
}
