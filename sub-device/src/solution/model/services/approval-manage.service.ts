import {
  ApprovalManageDTO,
  InsertApprovalFormTemplateParams,
  InsertApprovalGroupParams,
  QueryApprovalFormTemplatePagedList,
  QueryApprovalGroupListResult,
  QueryApprovalFormTemplatePagedListReturn
} from '../dto/approval-manage.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

const INSERTAPPROVALFORMTEMPLATE = 'approval/manage/insertApprovalFormTemplate';
const INSERT_APPROVAL_GROUP = 'approval/manage/insertApprovalGroup';
const QUERY_APPROVAL_GROUP_LIST = 'approval/manage/queryApprovalGroupList';
const QUERY_APPROVAL_FORMLIST_BYGROUPID = 'approval/manage/queryApprovalFormListByGroupId';
const APPROVAL_GROUP = 'approval/manage/approvalGroup';
const QUERY_APPROVAL_GROUPDETAIL = 'approval/manage/queryApprovalGroupDetail';
const QUERYAPPROVALFORMTEMPLATEPAGEDLIST = 'approval/manage/queryApprovalFormTemplatePagedList';
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

  queryApprovalFormTemplatePagedList(
    params: QueryApprovalFormTemplatePagedList
  ): Observable<{ dataList: QueryApprovalFormTemplatePagedListReturn[]; total: number }> {
    return this.requestService.post(QUERYAPPROVALFORMTEMPLATEPAGEDLIST, params);
  }

  queryApprovalGroupList(params: {
    organizationId: string;
    name?: string;
  }): Observable<QueryApprovalGroupListResult[]> {
    return this.requestService.get(QUERY_APPROVAL_GROUP_LIST, params);
  }

  queryApprovalFormListByGroupId(params: { groupId: string | number }) {
    return this.requestService.get(QUERY_APPROVAL_FORMLIST_BYGROUPID, params);
  }

  deleteApprovalGroup(params: { id: string }) {
    return this.requestService.delete(APPROVAL_GROUP, params);
  }

  queryApprovalGroupDetail(params: { id: string }) {
    return this.requestService.get(QUERY_APPROVAL_GROUPDETAIL, params);
  }
}
