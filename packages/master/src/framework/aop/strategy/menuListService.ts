import { Observable, of } from 'rxjs';
import { map, publishReplay, refCount, concatMap } from 'rxjs/operators';
import { HomeService } from '~/solution/model/services/home.service';
import { ShowNotification } from '~/framework/util/common';
export class MenuListService {
  homeService = new HomeService();
  menuList: Observable<any>;

  constructor() {}

  // Get configs from server | HTTP GET
  getMenuList() {
    // Cache it once if configs value is false
    if (!this.menuList) {
      this.menuList = this.homeService.getMyInfo().pipe(
        concatMap((res: any) => {
          let roleIdList = [];
          roleIdList = res?.rolesCodeList.map((role: any) => role.key);

          if (!!roleIdList.length) {
            return this.homeService
              .getMenuList({
                systemId: res.systemId,
                roleIdList
              })
              .pipe(
                map(data => ({
                  menuList: data,
                  userInfo: res
                }))
              );
          } else {
            ShowNotification.error('当前账号未绑定角色，无法访问！');
            return of(false);
          }
        }),
        map(data => data),
        publishReplay(1), // this tells Rx to cache the latest emitted
        refCount() // and this tells Rx to keep the Observable alive as long as there are any Subscribers
      );
    }

    return this.menuList;
  }

  // Clear configs
  clearMenuList() {
    this.menuList = null;
  }
}
