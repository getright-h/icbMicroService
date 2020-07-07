import {
  StationManageDTO,
  QueryStationListParam,
  ExampleResponseResult,
  AddStationParam,
  SetStationParam,
  QueryRoleListParam
} from '../dto/station-manage.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

const QUERY_STATION_LIST = 'prvilege/common/queryDepartmentOrPositionPagedList';
const QUERY_ROLE_LIST = 'prvilege/common/queryRoleList';
const ADD_POSITION = 'prvilege/common/addPosition';
const SET_POSITION = 'prvilege/common/setPosition';
const DELETE_STATION = 'prvilege/common/organization';

@DepUtil.Injectable()
export class StationManageService extends StationManageDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  // 查询岗位列表
  queryStationList(params: QueryStationListParam): Observable<ExampleResponseResult> {
    return this.requestService.post(QUERY_STATION_LIST, params);
  }

  // 查询可关联角色
  queryRoleList(params: QueryRoleListParam): Observable<ExampleResponseResult> {
    return this.requestService.get(QUERY_ROLE_LIST, params);
  }

  // 添加岗位
  addStation(params: AddStationParam): Observable<ExampleResponseResult> {
    return this.requestService.post(ADD_POSITION, params);
  }

  // 修改岗位
  setStation(params: SetStationParam): Observable<ExampleResponseResult> {
    return this.requestService.post(SET_POSITION, params);
  }

  // 删除部门
  deleteStation(organizationId: string): Observable<ExampleResponseResult> {
    return this.requestService.delete(DELETE_STATION, { organizationId });
  }
}
