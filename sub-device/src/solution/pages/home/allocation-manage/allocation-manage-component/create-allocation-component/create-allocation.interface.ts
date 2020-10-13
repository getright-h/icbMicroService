/**
 * @export state变量定义和初始化
 * @class ICreateAllocationState
 */
import { SetAllotFlowTemplateParam } from '~model/dto/template-service.dto';
export class ICreateAllocationState {
  searchForm: SetAllotFlowTemplateParam;
  submitLoading = false;
}
