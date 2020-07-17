import { Observable } from 'rxjs';
import { IMenu } from '~components/base/menu-component/menu.interface';

export abstract class LoginDTO {
  abstract login(params: LoginParam): Observable<LoginResult>;
  abstract getVerificationCode(codeKey: string): Observable<VCodeInfo>;
}

// 登录
export interface LoginParam {
  account: string;
  password: string;
  verificationCodeInfo: VerificationCodeInfo;
  systemCode?: string;
  systemId?: string;
}

export interface VerificationCodeInfo {
  sessionId: string;
  codeStrValue: string;
}

// 登录响应
export interface LoginResult {
  token: string;
  status: boolean;
}

export interface VCodeInfo {
  sessionId: string;
  codeImgBase64: string;
}
