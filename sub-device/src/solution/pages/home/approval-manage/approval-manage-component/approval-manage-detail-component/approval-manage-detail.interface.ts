import { InsertApprovalFormTemplateParams } from '~/solution/model/dto/approval-manage.dto';
import { DoError } from '../../../../../../framework/util/common/doError';
/**

 * @export state变量定义和初始化
 * @class IApprovalManageDetailState
 */
export class IApprovalManageDetailState {
  remark: string;
  visible: boolean;
  isRefuse: boolean;
  confirmLoading: boolean;
  formTemplate: FormTemplateInfo;
}

export const CHECK_VALID_OBJECT = {
  remark: {
    message: '请输入备注',
    checkFunction: DoError.checkIsEmpty
  }
};

export interface FormTemplateInfo {
  statusText: string;
  status: number;
  templateId: string;
  instanceForm: InsertApprovalFormTemplateParams;
  id: string;
}
