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
const QUERY_APPROVAL_FORM_DETAIL = 'approval/manage/queryApprovalFormDetail';
const SET_APPROVAL_GROUP = 'approval/manage/setApprovalGroup';
const SETFORM_TEMPLATE_STATE = 'approval/manage/setFormTemplateState';
@DepUtil.Injectable()
export class ApprovalManageService extends ApprovalManageDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  queryApprovalFormDetail(params: { id: string }): Observable<InsertApprovalFormTemplateParams> {
    return this.requestService.get(QUERY_APPROVAL_FORM_DETAIL, params);
  }
  // 车主管理列表
  insertApprovalFormTemplate(params: InsertApprovalFormTemplateParams | any) {
    return this.requestService.post(INSERTAPPROVALFORMTEMPLATE, params);
  }

  // 启用禁用模板
  setFormTemplateState(params: { id: string }) {
    return this.requestService.get(SETFORM_TEMPLATE_STATE, params);
  }

  insertApprovalGroup(params: InsertApprovalGroupParams) {
    return this.requestService.post(INSERT_APPROVAL_GROUP, params);
  }

  setApprovalGroup(params: InsertApprovalGroupParams) {
    return this.requestService.post(SET_APPROVAL_GROUP, params);
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