import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class DepartmentManageDTO {
  // 你的抽象方法，具体在 Service 中实现
  abstract queryDepartmentList(params: QueryDepartmentListParam): Observable<Array<DepartmentInfo>>;
  abstract addDepartment(params: SetDepartmentParams): Observable<boolean>;
  abstract setDepartment(params: SetDepartmentParams): Observable<boolean>;
  abstract deleteDepartment(organizationId: string): Observable<boolean>;
}

// 示例 Dto
export interface QueryDepartmentListParam {
  systemId?: string;
  state?: number;
  type?: number;
  index: number;
  size: number;
}
export interface SetDepartmentParams {
  id?: string;
  parentOrganizationId: string;
  parentDepartmentId: string;
  name: string;
  instruction: string;
  state: boolean;
}

export interface DepartmentInfo {
  parentOrganizationName: string;
  parentDepartmentName: string;
  id: string;
  code: string;
  name: string;
  state: boolean;
  instruction: string;
  roleList: RoleList[];
}

interface RoleList {
  id: string;
  name: string;
  state: boolean;
  code: string;
  originalCode: string;
  systemId: string;
}
