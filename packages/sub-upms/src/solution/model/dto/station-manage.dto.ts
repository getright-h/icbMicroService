import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class StationManageDTO {
  // 你的抽象方法，具体在 Service 中实现
  abstract queryStationList(params: QueryStationListParam): Observable<ExampleResponseResult>;
  abstract queryRoleList(params: QueryRoleListParam): Observable<ExampleResponseResult>;
  abstract addStation(params: AddStationParam): Observable<ExampleResponseResult>;
  abstract setStation(params: SetStationParam): Observable<ExampleResponseResult>;
  abstract deleteStation(organizationId: string): Observable<ExampleResponseResult>;
}

// 示例 Dto
export interface QueryStationListParam {
  systemId?: string;
  state?: number;
  type?: number;
  index: number;
  size: number;
}
export interface QueryRoleListParam {
  systemId: string;
  userId: string;
}

export interface AddStationParam {
  parentOrganizationId: string;
  parentDepartmentId: string;
  name: string;
  roles: string[];
  state: boolean;
  instruction: string;
}
export interface SetStationParam {
  id: string;
  name: string;
  roles: string[];
  state: boolean;
  instruction: string;
}

// 响应 Dto
export interface ExampleResponseResult {
  data: any;
  status: boolean;
}
