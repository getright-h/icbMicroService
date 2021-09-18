import {
  DepartmentManageDTO,
  QueryDepartmentListParam,
  DepartmentInfo,
  SetDepartmentParams
} from '../dto/department-manage.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

const QUERY_DEPARTMENT_LIST = 'prvilege/common/queryDepartmentOrPositionPagedList';
const ADD_DEPARTMENT = 'prvilege/common/addDepartment';
const SET_DEPARTMENT = 'prvilege/common/setDepartment';
const DELETE_DEPARTMENT = 'prvilege/common/organization';

@DepUtil.Injectable()
export class DepartmentManageService extends DepartmentManageDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  // 查询部门列表
  queryDepartmentList(params: QueryDepartmentListParam): Observable<Array<DepartmentInfo>> {
    return this.requestService.post(QUERY_DEPARTMENT_LIST, params);
  }

  // 添加部门
  addDepartment(params: SetDepartmentParams): Observable<boolean> {
    return this.requestService.post(ADD_DEPARTMENT, params);
  }

  // 修改部门
  setDepartment(params: SetDepartmentParams): Observable<boolean> {
    return this.requestService.post(SET_DEPARTMENT, params);
  }

  // 删除部门
  deleteDepartment(organizationId: string): Observable<boolean> {
    return this.requestService.delete(DELETE_DEPARTMENT, { organizationId });
  }
}
