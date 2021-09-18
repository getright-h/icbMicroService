import * as _ from 'lodash';
import { DepUtil } from '~/framework/aop/inject';
import { IMenu } from '~/framework/components/menu-component/menu.interface';

@DepUtil.Injectable()
export class MenuService {
  menuItems: any[] = [];
  currentPath = '';
  updateMenuByRoutes(routes: IMenu[]): IMenu[] {
    this.menuItems = this.convertRoutesToMenus(routes);
    return this.menuItems;
  }

  convertRoutesToMenus(routes: IMenu[]): IMenu[] {
    return this.convertArrayToItems(routes);
  }

  private convertArrayToItems(routes: IMenu[], parent?: IMenu): IMenu[] {
    const items: IMenu[] = [];
    routes.forEach(route => {
      items.push(this.convertObjectToItem(route, parent));
    });
    return items;
  }

  private convertObjectToItem(object: IMenu, parent?: IMenu): IMenu {
    const item = object;

    item.paths = parent && parent.paths ? parent.paths.slice(0) : '';
    if (!!item.path) item.paths += `/${item.path}`;

    if (object.children && object.children.length > 0) {
      item.children = this.convertArrayToItems(object.children, item);
    }
    return item;
  }
}
