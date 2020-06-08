import { Observable } from 'rxjs';
import { IMenu } from '~components/base/menu-component/menu.interface';

export abstract class LoginDTO {
  // 登录
  abstract login(params: LoginParam): Observable<LoginResult>;
}

// 登录
export interface LoginParam {
  username: string;
  password: string;
  vcode: string;
  vcodeKey: string;
}

// 登录响应
export interface LoginResult {
  token: string;
  status: boolean;
}
