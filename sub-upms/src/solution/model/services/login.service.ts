import { LoginDTO, LoginParam, LoginResult } from '../dto/login.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable, Subscriber } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';
import { delay } from 'rxjs/operators';

/**
 * 真实开发中，请将示例代码移除
 */

const EXAMPLE_API_PATH = 'your-http-request-path';

@DepUtil.Injectable()
export class LoginService extends LoginDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  // 登录
  login(params: LoginParam): Observable<LoginResult> {
    // return this.requestService.get(EXAMPLE_API_PATH, params);
    return Observable.create((observer: Subscriber<LoginResult>) => {
      observer.next({ token: 'loginSuccess', status: true });
      observer.complete();
    }).pipe(delay(500));
  }
}
