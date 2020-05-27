import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class AddressChooseDTO {
  // 你的抽象方法，具体在 Service 中实现
  abstract areasList(params: AreasListParam): Observable<AreasListReturn[]>;
  abstract areaListByCode(params: AreasListParam): Observable<AreasListReturn[]>;
}

// 示例 Dto
export interface AreasListParam {
  // 示例参数
  deep?: number;
  cityCode?: string;
}

export interface AreasListReturn {
  cityCode: string;
  cityName: string;
  deep: string;
  parentCode: string;
}
