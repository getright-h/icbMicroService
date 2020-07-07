import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class UserManageDTO {
  // 你的抽象方法，具体在 Service 中实现
  abstract queryUserList(params: QueryUserListParams): Observable<Array<UserInfoResponse>>;
  abstract insertUser(params: SetUserParams): Observable<boolean>;
  abstract setUser(params: SetUserParams): Observable<boolean>;
  abstract setUserPassword(params: SetUserPasswordParams): Observable<boolean>;
  abstract getUserDetail(strValue: string): Observable<UserInfoResponse>;
}

// 示例 Dto
export interface QueryUserListParams {
  systemId?: string;
  index: number;
  size: number;
}
export interface SetUserParams {
  id: string;
  channel: number;
  portraitUrl: string;
  password: string;
  name: string;
  telephone: string;
  email: string;
  instruction: string;
  extendAttribution: ExtendAttribution[];
  systemCode: string;
  roleList: RoleList[];
  organizationIds: OrganizationId[];
}

export interface SetUserPasswordParams {
  oldPassword: string;
  newPassword: string;
  userId: string;
}

interface OrganizationId {
  positionId: string;
  positionCode: string;
  departmentId: string;
  departmentCode: string;
  organizationId: string;
  organizationCode: string;
  departmentName: string;
  positionName: string;
  organizationName: string;
  userType: number;
}

interface RoleList {
  roleId: string;
  roleCode: string;
}

interface ExtendAttribution {
  key: string;
  value: string;
}

// 响应 Dto
export interface UserInfoResponse {
  id: string;
  portraitUrl: string;
  account: string;
  channel: number;
  name: string;
  telephone: string;
  email: string;
  state: boolean;
  instruction: string;
  lastLoginTime: string;
  createTime: string;
  systemId: string;
  systemCode: string;
  organizationId: string;
  organizationName: string;
  organizationCode: string;
  rolesCodeList: RolesCodeList[];
  privilegesCodeList: RolesCodeList[];
  departmentId: string;
  positionId: string;
  departmentList: DepartmentList[];
  positionList: DepartmentList[];
  extendAttribution: string;
}

interface DepartmentList {
  id: string;
  code: string;
  name: string;
}

interface RolesCodeList {
  id: string;
  code: string;
  name: string;
  userId: string;
}
