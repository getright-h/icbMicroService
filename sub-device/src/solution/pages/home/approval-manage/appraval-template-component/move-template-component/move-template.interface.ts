import { DataNode } from 'rc-tree/lib/interface';
import { QueryStoreOrganizationReturn } from '~/solution/model/dto/warehouse-list.dto';

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
  treeData: DataNode[] = [];
  confirmLoading = false;
  checkedObject: DataNode[] = [];
  allTemplate: [];
  organazationList: QueryStoreOrganizationReturn[] = [];
  groupIdList: string[] = [];
  formTemplateIdList: string[] = [];
}

export class IMoveTemplateProps {
  addMoveTemplateVisible = false;
  closeMoveTemplateModal?: (isRefresh?: boolean) => void;
}

export const TREE_MAP = {
  title: 'name',
  key: 'id'
};
