import { Observable } from 'rxjs';

export abstract class LoginDTO {
  // 登录
  abstract login(params: LoginParam): Observable<LoginResult>;
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
