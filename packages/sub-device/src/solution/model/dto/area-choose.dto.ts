import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class AreaChooseDTO {
  // 你的抽象方法，具体在 Service 中实现
  abstract queryAreaInfoHttp(params: { code?: string }): Observable<AreaReturnDto[]>;
}

export interface AreaCodeDto {
  code?: string;
}
export interface AreaReturnDto {
  code: string;
  name: string;
}
