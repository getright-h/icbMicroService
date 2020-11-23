import { DataNode } from 'rc-tree/lib/interface';
import { QueryStoreOrganizationReturn } from '~/solution/model/dto/warehouse-list.dto';
/**

 * @export state变量定义和初始化
 * @class IApprovalTemplateLeftState
 */
export class IApprovalTemplateLeftState {
  addApprovalTypeVisible = false;
  loadStoreOrganizationParams = {
    typeId: 'c59c75eec2d3cc075cca08d84386bcb9',
    id: ''
  };
  organazationList: QueryStoreOrganizationReturn[] = [];
  expandedKeys: string[] = [];
  treeSelectedKeys: string[] = [];
  treeData: DataNode[] = [];
  isEditApprovalModal = false;
  editApprovalId: '';
  groupId: string;
  isChooseALl = true;
}
