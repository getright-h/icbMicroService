import { DataNode } from 'rc-tree/lib/interface';
import { QueryStoreOrganizationReturn } from '~/solution/model/dto/warehouse-list.dto';
/**

 * @export state变量定义和初始化
 * @class IAddTemplateTypeState
 */
export class IAddTemplateTypeProps {
  addApprovalTypeVisible = false;
  isEdit = false;
  groupId = '';
  organazationList: QueryStoreOrganizationReturn[] = [];
  closeAddTemplateTypeModal: (isRefresh?: boolean, id?: string) => void;
}

export class IAddTemplateTypeState {
  name: string;
  type: number;
  expandedKeys: string[] = [];
  parentOrganizationId: string;
  checkedKeys: string[] = [];
  confirmLoading = false;
  checkedObject: DataNode[] = [];
  organazationList: any[] = [];
}
