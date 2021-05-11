import { HomeDTO, MenuAndAuthResult, MenuRequestParam, DownloadTaskParam, DownloadTaskResult } from '../dto/home.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable, Subscriber } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';
import { delay } from 'rxjs/operators';
import { PAGES_MENU } from '~/solution/shared/constant/common.const';
import { MyInfo } from '~/solution/model/dto/home.dto';

/**
 * 真实开发中，请将示例代码移除
 */
const GET_MY_INFO = 'prvilege/GetMyInfo';
const GET_MENU = 'prvilege/common/menuTreeLogin';
const GET_DOWNLOAD_TASK = 'dataProcess/userDownloadTaskPagedList';

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

  // 获取登录用户信息
  getMyInfo(): Observable<MyInfo> {
    return this.requestService.get(GET_MY_INFO);
  }

  // 获取菜单
  getMenuList(params: MenuRequestParam): Observable<MenuAndAuthResult> {
    return this.requestService.post(GET_MENU, params);
  }

  // 获取下载任务
  getDownloadTask(params: DownloadTaskParam): Observable<DownloadTaskResult> {
    return this.requestService.post(GET_DOWNLOAD_TASK, params);
  }
}
