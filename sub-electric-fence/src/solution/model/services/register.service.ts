import { RegisterDTO, RegisterParam } from '../dto/register.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';

const REGISTER = '/GlobPermissionVerificationPlugin/VerifyCode';

export class RegisterService extends RegisterDTO {
  private readonly requestService: RequestService = new RequestService();
  constructor() {
    super();
  }

  register(params: { sessionId: '' }): Observable<RegisterParam> {
    return this.requestService.get(REGISTER, params);
  }
}
