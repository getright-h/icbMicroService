import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class UserManageDTO {
  // 你的抽象方法，具体在 Service 中实现
  abstract updatePassword(params: PasswordEditParams): Observable<boolean>;
}

// 示例 Dto

export interface PasswordEditParams {
  oldPassword: string;
  newPassword: string;
  userId: string;
}
