import { IMenu } from '~components/base/menu-component/menu.interface';

export class IHomeProps {
  loading = true;
  isIndex = false;
  menuList: IMenu[] = [];
  userInfo: Record<string, any>;
}
