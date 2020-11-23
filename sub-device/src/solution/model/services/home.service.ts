import { HomeDTO, MenuAndAuthResult } from '../dto/home.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable, Subscriber } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';
import { delay } from 'rxjs/operators';
import { PAGES_MENU } from '~/solution/shared/constant/common.const';

/**
 * 真实开发中，请将示例代码移除
 */

@DepUtil.Injectable()
export class HomeService extends HomeDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
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
