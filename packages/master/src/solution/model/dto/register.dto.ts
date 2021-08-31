import { Observable } from 'rxjs';

export abstract class RegisterDTO {
  // 后端返回的体量现在过大
  abstract register(params: { sessionId: '' }): Observable<RegisterParam>;
}

export interface RegisterParam {
  code: string;
  telephone: string;
  message: string;
  requestId: string;
  userType: number;
  unitId: string;
  fromUser: string;
  activityId: string;
  plateNumber: string;
}
