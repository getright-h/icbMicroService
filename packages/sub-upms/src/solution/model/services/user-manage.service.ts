import {
  UserManageDTO,
  QueryUserListParams,
  UserInfoResponse,
  SetUserParams,
  SetUserPasswordParams,
  UserBelongInfoResponse,
  PositionRelateRule,
  PasswordEditParams
} from '../dto/user-manage.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */
const QUERY_USER_LIST = 'prvilege/common/getUserInfoByParam';
const INSERT_USER = 'prvilege/common/insertUser';
const SET_USER = 'prvilege/common/setUser';
const DELETE_USER = 'prvilege/DeleteUser';
const SET_PASSWORD = 'prvilege/common/setPassword';
const GET_USER_DETAIL = 'prvilege/common/userDetail';
const QUERY_USER_BELONG_INFO = 'prvilege/common/queryOrganizationInfoByUserId';
const QUERY_POSITION_ROLE_LIST = 'prvilege/common/queryPositionRoleList';
const RESET_PASSWORD = 'prvilege/UpdatePassword';
const UPDATE_PASSWORD = 'prvilege/common/setPassword';

@DepUtil.Injectable()
export class UserManageService extends UserManageDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  // 获取用户信息
  queryUserList(params: QueryUserListParams): Observable<Array<UserInfoResponse>> {
    return this.requestService.post(QUERY_USER_LIST, params);
  }

  // 添加用户
  insertUser(params: SetUserParams): Observable<boolean> {
    return this.requestService.post(INSERT_USER, params);
  }

  // 修改用户
  setUser(params: SetUserParams): Observable<boolean> {
    return this.requestService.post(SET_USER, params);
  }

  // 删除用户
  deleteUser(userId: string): Observable<boolean> {
    return this.requestService.delete(DELETE_USER, { userId });
  }

  // 修改密码
  setUserPassword(params: SetUserPasswordParams): Observable<boolean> {
    return this.requestService.post(SET_PASSWORD, params);
  }

  // 用户详情
  getUserDetail(strValue: string): Observable<UserInfoResponse> {
    return this.requestService.get(GET_USER_DETAIL, { strValue });
  }

  // 用户所属机构、部门、岗位
  queryOrganizationInfoByUserId(userId: string): Observable<Array<UserBelongInfoResponse>> {
    return this.requestService.get(QUERY_USER_BELONG_INFO, { userId });
  }

  // 查询岗位已关联角色
  queryPositionRoleList(positionId: string): Observable<Array<PositionRelateRule>> {
    return this.requestService.get(QUERY_POSITION_ROLE_LIST, { positionId });
  }

  // 重置密码
  resetPassword(userId: string): Observable<string> {
    return this.requestService.post(RESET_PASSWORD, { userId });
  }

  // 修改密码
  updatePassword(params: PasswordEditParams): Observable<boolean> {
    return this.requestService.post(UPDATE_PASSWORD, params);
  }
}
