import { Observable } from 'rxjs';
import { IMenu } from '~components/base/menu-component/menu.interface';

export abstract class HomeDTO {
  // 获取菜单和权限
  abstract getMenuAndAuthKeys(): Observable<MenuAndAuthResult>;
}

// 获取菜单权限
export interface MenuAndAuthResult {
  data: IMenu[];
}
