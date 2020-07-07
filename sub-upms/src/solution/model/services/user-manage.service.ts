import {
  UserManageDTO,
  QueryUserListParams,
  UserInfoResponse,
  SetUserParams,
  SetUserPasswordParams
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
const SET_PASSWORD = 'prvilege/common/setPassword';
const GET_USER_DETAIL = 'prvilege/common/userDetail';

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

  // 修改密码
  setUserPassword(params: SetUserPasswordParams): Observable<boolean> {
    return this.requestService.post(SET_PASSWORD, params);
  }

  // 用户详情
  getUserDetail(strValue: string): Observable<UserInfoResponse> {
    return this.requestService.get(GET_USER_DETAIL, { strValue });
  }
}
