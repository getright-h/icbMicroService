import { QueryAllotFlowTemplatePagedListReturn } from '~/solution/model/dto/allocation-template.dto';

/**
 * @export state变量定义和初始化
 * @class IAllocationTemplateState
 */
export class IAllocationTemplateState {
  isLoading = false;
  editOrganizationName: string;
  searchForm = {
    index: 1,
    size: 10,
    name: '',
    organizationId: ''
  };
  timeInfo: Array<number | string> = [0, 0];
  tableData: QueryAllotFlowTemplatePagedListReturn[] = [];
  total = 0;
}
