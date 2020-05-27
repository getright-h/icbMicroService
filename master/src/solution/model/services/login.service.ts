import { LoginDTO, LoginParam, LoginResult, VCodeInfo } from '../dto/login.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

const LOGIN_PATH = 'GlobPermissionVerificationPlugin/Login';
const VERIFICATIONCODE = 'GlobPermissionVerificationPlugin/VerifyCode';
const CHECKIDENTITY = 'order/CheckIdentity';

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
    return this.requestService.get(VERIFICATIONCODE, { codeKey });
  }

  //账号角色验证
  checkIdentity(params: { loginRole: number }): Observable<LoginResult> {
    return this.requestService.post(CHECKIDENTITY, params);
  }
}
