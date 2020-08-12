import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class DrapChooseLoadingDTO {
  // 你的抽象方法，具体在 Service 中实现
  abstract queryOrganizationType(params: { systemId: string }): Observable<DrapChooseLoadingReturn>;
  abstract queryOrganizationSelectList(params: OrganizationSelectListParams): Observable<DrapChooseLoadingReturn>;
}

// 下拉加载 Dto
export interface OrganizationSelectListParams {
  systemId: string;
  hierarchyType: number;
  parentCode?: string;
  index: number;
  size: number;
}

export interface DrapChooseLoadingReturn {
  data: any;
  status: boolean;
}
