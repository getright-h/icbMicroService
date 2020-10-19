import { DataNode } from 'rc-tree/lib/interface';
/**

 * @export state变量定义和初始化
 * @class IAddTemplateTypeState
 */
export class IAddTemplateTypeProps {
  addApprovalTypeVisible = false;
  isEdit = false;
  templateTypeId = '';
  closeAddTemplateTypeModal: (isRefresh?: boolean, id?: string) => void;
}

export class IAddTemplateTypeState {
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
