import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class UserManageDTO {
  // 你的抽象方法，具体在 Service 中实现
  abstract queryUserList(params: QueryUserListParams): Observable<Array<UserInfoResponse>>;
  abstract insertUser(params: SetUserParams): Observable<boolean>;
  abstract setUser(params: SetUserParams): Observable<boolean>;
  abstract deleteUser(userId: string): Observable<boolean>;
  abstract setUserPassword(params: SetUserPasswordParams): Observable<boolean>;
  abstract getUserDetail(strValue: string): Observable<UserInfoResponse>;
  abstract queryOrganizationInfoByUserId(userId: string): Observable<Array<UserBelongInfoResponse>>;
  abstract queryPositionRoleList(positionId: string): Observable<Array<PositionRelateRule>>;
  abstract resetPassword(userId: string): Observable<string>;
  abstract updatePassword(params: PasswordEditParams): Observable<boolean>;
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

export interface OrganizationId {
  positionId?: string;
  positionCode?: string;
  positionName?: string;
  departmentId?: string;
  departmentCode?: string;
  departmentName?: string;
  organizationId?: string;
  organizationCode?: string;
  organizationName?: string;
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

export interface UserBelongInfoResponse {
  positionId?: string;
  positionCode?: string;
  positionName?: string;
  departmentId?: string;
  departmentCode?: string;
  departmentName?: string;
  organizationId?: string;
  organizationCode?: string;
  organizationName?: string;
  roleList: RoleBelongInfo[];
}

interface RoleBelongInfo {
  id: string;
  code: string;
  name: string;
  userId: string;
  positionId: string;
}

export interface PositionRelateRule {
  positionId: string;
  positionCode: string;
  roleId: string;
  roleName: string;
  roleCode: string;
  createTime: string;
  systemId: string;
}

export interface PasswordEditParams {
  oldPassword: string;
  newPassword: string;
  userId: string;
}
