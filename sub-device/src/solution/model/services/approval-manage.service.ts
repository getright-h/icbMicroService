import {
  ApprovalManageDTO,
  InsertApprovalFormTemplateParams,
  InsertApprovalGroupParams
} from '../dto/approval-manage.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

const INSERTAPPROVALFORMTEMPLATE = 'approval/manage/insertApprovalFormTemplate';
const INSERT_APPROVAL_GROUP = 'approval/manage/insertApprovalGroup';

@DepUtil.Injectable()
export class ApprovalManageService extends ApprovalManageDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  // 车主管理列表
  insertApprovalFormTemplate(params: InsertApprovalFormTemplateParams | any) {
    return this.requestService.post(INSERTAPPROVALFORMTEMPLATE, params);
  }

  insertApprovalGroup(params: InsertApprovalGroupParams) {
    return this.requestService.post(INSERT_APPROVAL_GROUP, params);
  }
}
