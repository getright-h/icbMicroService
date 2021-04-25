import { StorageUtil } from '~/framework/util/storage';
import { Strategy } from './base.strategy';
import { MenuListService } from './MenuListService';

export class AuthStrategy extends Strategy {
  menuListService = new MenuListService();
  constructor() {
    super();
  }
  canActive() {
    const token = StorageUtil.getLocalStorage('token');

    if (!token) return false;

    return true;
  }

  // 默认跳转菜单中第一个页面
  judgeInMenu(arr: any[], urlPath: string) {
    let isValidPath = false;
    function expand(arr: any[]) {
      arr.map((node: any) => {
        if (!isValidPath) {
          if (!node.children.length) {
            if (urlPath == node.path) {
              isValidPath = true;
            }
          } else {
            expand(node.children);
          }
        }
      });
    }
    expand(arr);
    return isValidPath;
  }
}
