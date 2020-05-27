import { IMenu } from '~components/base/menu-component/menu.interface';
import { HomeService } from '~/solution/model/services/home.service';
import { MenuService } from '~/framework/util/menu/menu.service';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { IHomeProps } from './home.interface';
import { useEffect } from 'react';
import { Subscription } from 'rxjs';
import { setState } from '~/framework/microAPP/appStore';
export function useHomeStore() {
  const homeService = useService(HomeService);
  const menuService = useService(MenuService);
  let menuAndAuthSubscription: Subscription;
  const { state, setStateWrap } = useStateStore(new IHomeProps());

  useEffect(() => {
    getMenuAndAuth();
    return () => {
      menuAndAuthSubscription.unsubscribe();
    };
  }, []);

  function sendToChild() {
    setState({ test: 'test' });
  }

  function getMenuAndAuth() {
    menuAndAuthSubscription = homeService.getMenuAndAuthKeys().subscribe((menuList: { data: IMenu[] }) => {
      setStateWrap({ menuList: menuService.updateMenuByRoutes(menuList.data), loading: false });
    });
  }

  return { state, sendToChild };
}
