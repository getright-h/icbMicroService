import { UserManageDTO, PasswordEditParams } from '../dto/user-manage.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */
const UPDATE_PASSWORD = 'prvilege/common/setPassword';

@DepUtil.Injectable()
export class UserManageService extends UserManageDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  // 修改密码
  updatePassword(params: PasswordEditParams): Observable<boolean> {
    return this.requestService.post(UPDATE_PASSWORD, params);
  }
}
