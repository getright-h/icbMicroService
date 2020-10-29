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
  name: string;
  expandedKeys: string[] = [];
  checkedKeys: string[] = [];
  confirmLoading = false;
  checkedObject: DataNode[] = [];
}
