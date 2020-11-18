import { InsertApprovalFormTemplateParams } from '~/solution/model/dto/approval-manage.dto';

/**
 * @export state变量定义和初始化
 * @class IApprovalTemplateFormModalState
 */
export class IApprovalTemplateFormModalState {
  formTemplate: InsertApprovalFormTemplateParams;
  submitLoading: boolean;
}
