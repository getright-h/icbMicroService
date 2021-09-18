import { HomeDTO, MenuAndAuthResult } from '../dto/home.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable, Subscriber } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PAGES_MENU } from '~/solution/shared/constant/common.const';

export class HomeService extends HomeDTO {
  private readonly requestService: RequestService = new RequestService();
  constructor() {
    super();
    console.log(this.requestService);
  }

  // 获取菜单权限
  getMenuAndAuthKeys(): Observable<MenuAndAuthResult> {
    const initialMenuList: any = PAGES_MENU.MENU;
    return Observable.create((observer: Subscriber<MenuAndAuthResult>) => {
      observer.next({
        data: initialMenuList
      });
      observer.complete();
    }).pipe(delay(500));
  }
}
