import { RegisterDTO, RegisterParam } from '../dto/register.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

const REGISTER = '/GlobPermissionVerificationPlugin/VerifyCode';

@DepUtil.Injectable()
export class RegisterService extends RegisterDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  register(params: { sessionId: '' }): Observable<RegisterParam> {
    return this.requestService.get(REGISTER, params);
  }
}
