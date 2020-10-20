import { DataNode } from 'rc-tree/lib/interface';

/**
 * @export state变量定义和初始化
 * @class IMoveTemplateState
*/
export class IMoveTemplateState {
    expandedKeys: string[] = [];
    loadStoreOrganizationParams = {
      typeId: 'c59c75eec2d3cc075cca08d84386bcb9',
      id: ''
    };
    checkedKeys: string[] = [];
    confirmLoading = false;
    treeData: DataNode[] = [];
    checkedObject: DataNode[] = [];
}

export const TREE_MAP = {
    title: 'name',
    key: 'id'
  };