import {
  ApprovalManageDTO,
  InsertApprovalFormTemplateParams,
  InsertApprovalGroupParams,
  QueryApprovalFormTemplatePagedList,
  QueryApprovalGroupListResult,
  QueryApprovalFormTemplatePagedListReturn,
  QueryApprovalApplyListParams,
  QueryApprovalApplyListReturn,
  QueryApprovalProcessListParams,
  QueryApprovalProcessListReturn
} from '../dto/approval-manage.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';
import { map } from 'rxjs/operators';

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
const APPROVAL_FORM_TEMPLATE = 'approval/manage/approvalFormTemplate';
const MOVE_APPROVALFORM_TEMPLATE = 'approval/manage/moveApprovalFormTemplate';
const QUERY_APPROVAL_APPLY_LIST = 'approval/flow/FlowApplyList';
const QUERY_APPROVAL_PROCESS_LIST = 'approval/flow/FlowProcessList';
const SET_APPROVAL_FORM_TEMPLATE = 'approval/manage/setApprovalFormTemplate';
const FLOW_PROCESS = 'approval/flow/process';
const FLOW_REVOKE = 'approval/flow/revoke';
const QUERY_APPROVAL_INSTANCE_DETAIL = 'approval/manage/queryApprovalInstanceDetail';
const FLOW_CREATE = 'approval/flow/create';
const FLOW_INFO = 'approval/flow/info';
const FLOW_EDIT = 'approval/flow/edit';
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

  // 删除模板
  deleteApprovalFormTemplate(params: { id: string; groupId: string }) {
    return this.requestService.delete(APPROVAL_FORM_TEMPLATE, params);
  }

  // 移动模板
  moveApprovalFormTemplate(params: { formTemplateIdList: string[]; groupIdList: string[]; isCopy: boolean }) {
    return this.requestService.post(MOVE_APPROVALFORM_TEMPLATE, params);
  }
  // 审核申请列表
  queryApprovalApplyList(
    params: QueryApprovalApplyListParams
  ): Observable<{ data: QueryApprovalApplyListReturn[]; total: number }> {
    return this.requestService.post(QUERY_APPROVAL_APPLY_LIST, params);
  }

  // 审核处理列表
  queryApprovalProcessList(
    params: QueryApprovalProcessListParams
  ): Observable<{ data: QueryApprovalProcessListReturn[]; total: number }> {
    return this.requestService.post(QUERY_APPROVAL_PROCESS_LIST, params).pipe(
      map((res: { data: any[]; total: number }) => {
        const data = res.data.map(item => {
          item.uniqueId = item.audit.flowAuditId;
          return item;
        });
        return { ...res, data };
      })
    );
  }

  setApprovalFormTemplate(params: InsertApprovalFormTemplateParams | any) {
    return this.requestService.post(SET_APPROVAL_FORM_TEMPLATE, params);
  }

  // 撤回审批申请
  flowRevoke(params: { id: string }) {
    return this.requestService.post(FLOW_REVOKE, params);
  }

  flowProcess(params: { id: string; remark: string; passed: boolean }) {
    return this.requestService.post(FLOW_PROCESS, params);
  }

  queryApprovalInstanceDetail(params: {
    type: number;
    formInstanceId: string;
  }): Observable<InsertApprovalFormTemplateParams> {
    return this.requestService.get(QUERY_APPROVAL_INSTANCE_DETAIL, params);
  }

  flowCreate(params: InsertApprovalFormTemplateParams) {
    return this.requestService.post(FLOW_CREATE, params);
  }

  flowInfo(params: { id: string; flowAuditId: string }) {
    return this.requestService.get(FLOW_INFO, params);
  }

  flowEdit(params: InsertApprovalFormTemplateParams) {
    return this.requestService.post(FLOW_EDIT, params);
  }
}
