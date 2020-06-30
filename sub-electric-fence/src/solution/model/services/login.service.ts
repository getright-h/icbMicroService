import { LoginDTO, LoginParam, LoginResult } from '../dto/login.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable, Subscriber } from 'rxjs';
import { delay } from 'rxjs/operators';

/**
 * 真实开发中，请将示例代码移除
 */

const EXAMPLE_API_PATH = 'your-http-request-path';

export class LoginService extends LoginDTO {
  private readonly requestService: RequestService = new RequestService();
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
