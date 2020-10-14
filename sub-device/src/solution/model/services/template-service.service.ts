import {
  IReturn,
  TemplateServiceDTO,
  QueryAllotFlowTemplateNodeListByTemplateIdParam,
  QueryAllotFlowTemplateDetailParam,
  InsertAllotFlowTemplateParam,
  SetAllotFlowTemplateParam,
  AllotFlowTemplateParam,
  QueryAllotFlowTemplatePagedListParam
} from '../dto/template-service.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

// 新增调拨流程模板
const INSERT_ALLOT_FLOW_TEMPLATE = 'allot/manage/insertAllotFlowTemplate';
// 更新调拨流程模板
const SET_ALLOT_FLOW_TEMPLATE = 'POST allot/manage/setAllotFlowTemplate';
// 删除调拨流程模板
const ALLOT_FLOW_TEMPLATE = 'allot/manage/allotFlowTemplate';
// 查询调拨模板分页列表
const QUERY_ALLOT_FLOW_TEMPLATE_PAGED_LIST = 'allot/manage/queryAllotFlowTemplatePagedList';
// 根据调拨模板Id查询所有的节点
const QUERY_ALLOT_FLOW_TEMPLATE_NODE_LIST_BY_TEMPLATE_ID = 'allot/manage/queryAllotFlowTemplateNodeListByTemplateId';
// 调拨模板详情
const QUERY_ALLOT_FLOW_TEMPLATED_ETAIL = 'allot/manage/queryAllotFlowTemplateDetail';

@DepUtil.Injectable()
export class TemplateServiceService extends TemplateServiceDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  insertAllotFlowTemplate(params: InsertAllotFlowTemplateParam): Observable<IReturn> {
    return this.requestService.post(INSERT_ALLOT_FLOW_TEMPLATE, params);
  }
  setAllotFlowTemplate(params: SetAllotFlowTemplateParam): Observable<IReturn> {
    return this.requestService.delete(SET_ALLOT_FLOW_TEMPLATE, params);
  }
  allotFlowTemplate(params: AllotFlowTemplateParam): Observable<IReturn> {
    return this.requestService.get(ALLOT_FLOW_TEMPLATE, params);
  }
  queryAllotFlowTemplatePagedList(params: QueryAllotFlowTemplatePagedListParam): Observable<IReturn> {
    return this.requestService.post(QUERY_ALLOT_FLOW_TEMPLATE_PAGED_LIST, params);
  }
  queryAllotFlowTemplateNodeListByTemplateId(
    params: QueryAllotFlowTemplateNodeListByTemplateIdParam
  ): Observable<IReturn> {
    return this.requestService.get(QUERY_ALLOT_FLOW_TEMPLATE_NODE_LIST_BY_TEMPLATE_ID, params);
  }
  queryAllotFlowTemplateDetail(params: QueryAllotFlowTemplateDetailParam): Observable<IReturn> {
    return this.requestService.get(QUERY_ALLOT_FLOW_TEMPLATED_ETAIL, params);
  }
}
