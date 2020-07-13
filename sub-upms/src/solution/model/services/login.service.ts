import { LoginDTO, LoginParam, LoginResult, VCodeInfo, MyAccountInfo } from '../dto/login.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

const LOGIN_PATH = 'GlobPermissionVerificationPlugin/Login';
const VERIFICATION_CODE = 'GlobPermissionVerificationPlugin/VerifyCode';
const GET_MY_INFO = 'prvilege/GetMyInfo';

@DepUtil.Injectable()
export class LoginService extends LoginDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  // 登录
  login(params: LoginParam): Observable<LoginResult> {
    return this.requestService.post(LOGIN_PATH, params);
  }

  // 获取验证码
  getVerificationCode(codeKey: string): Observable<VCodeInfo> {
    return this.requestService.get(VERIFICATION_CODE, { codeKey });
  }

  // 获取登录用户信息
  getMyInfo(): Observable<MyAccountInfo> {
    return this.requestService.get(GET_MY_INFO);
  }
}
