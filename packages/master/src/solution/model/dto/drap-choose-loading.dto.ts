import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class DrapChooseLoadingDTO {
  // 你的抽象方法，具体在 Service 中实现
  abstract manageList(
    params: DrapChooseLoadingParam
  ): Observable<{ dataList: DrapChooseLoadingReturn[]; total: number }>;
}

// 下拉加载 Dto
export interface DrapChooseLoadingParam {
  name: string;
  index: number;
  size: number;
}

export interface DrapChooseLoadingReturn {
  id: string;
  name: string;
}
