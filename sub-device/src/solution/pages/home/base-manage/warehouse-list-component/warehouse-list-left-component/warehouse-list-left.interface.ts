/**
 * @export state变量定义和初始化
 * @class IWarehouseListLeftState
 */
export class IWarehouseListLeftState {
  loadStoreOrganizationParams = {
    typeId: 'c59c75eec2d3cc075cca08d84386bcb9',
    id: ''
  };
  treeData: DataNode[] = [];
}

export interface DataNode {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: DataNode[];
}

export const TREE_MAP = {
  title: 'name',
  key: 'id',
  isLeaf: 'id'
};
