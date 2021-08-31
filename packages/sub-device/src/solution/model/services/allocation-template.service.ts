import {
  AllocationTemplateDTO,
  InsertAllotFlowTemplateParams,
  QueryAllotFlowTemplatePagedListParams,
  QueryAllotFlowTemplatePagedListReturn
} from '../dto/allocation-template.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

const QUERY_ALLOTFLOW_TEMPLATE_PAGED_LIST = 'allot/manage/queryAllotFlowTemplatePagedList';
const INSERT_ALLOTFLOW_TEMPLATE = 'allot/manage/insertAllotFlowTemplate';
const SET_ALLOTFLOW_TEMPLATE = 'allot/manage/setAllotFlowTemplate';
const DELETE_ALLOTFLOW_TEMPLATE = 'allot/manage/allotFlowTemplate';
@DepUtil.Injectable()
export class AllocationTemplateService extends AllocationTemplateDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  // 查询调拨模板分页列表
  queryAllotFlowTemplatePagedList(
    params: QueryAllotFlowTemplatePagedListParams
  ): Observable<{ dataList: QueryAllotFlowTemplatePagedListReturn[]; total: number }> {
    return this.requestService.post(QUERY_ALLOTFLOW_TEMPLATE_PAGED_LIST, params);
  }

  // 新增调拨流程模板
  insertAllotFlowTemplate(params: InsertAllotFlowTemplateParams) {
    return this.requestService.post(INSERT_ALLOTFLOW_TEMPLATE, params);
  }

  // 更新调拨流程模板
  setAllotFlowTemplate(params: InsertAllotFlowTemplateParams) {
    return this.requestService.post(SET_ALLOTFLOW_TEMPLATE, params);
  }
  // 删除调拨流程模板
  deleteAllotFlowTemplate(params: { id: string }) {
    return this.requestService.delete(DELETE_ALLOTFLOW_TEMPLATE, params);
  }
}
