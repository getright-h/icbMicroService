import { IMenu } from '~components/base/menu-component/menu.interface';
import { HomeService } from '~/solution/model/services/home.service';
import { MenuService } from '~/framework/util/menu/menu.service';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { IHomeProps } from './home.interface';
import { useEffect } from 'react';
import { Subscription } from 'rxjs';
import { setState } from '~/framework/microAPP/appStore';
import { fetchChildAppsConfig } from '~/framework/microAPP/fetchChildAppsConfig';
export function useHomeStore() {
  const homeService = useService(HomeService);
  const menuService = useService(MenuService);
  let menuAndAuthSubscription: Subscription;
  const { state, setStateWrap } = useStateStore(new IHomeProps());

  useEffect(() => {
    getMenuAndAuth();
  }, []);

  function sendToChild() {
    setState({ test: 'test' });
  }

  function getMenuAndAuth() {
    fetchChildAppsConfig().then((menuList: { data: IMenu[] }) => {
      setStateWrap({ menuList: menuService.updateMenuByRoutes(menuList), loading: false });
    });
  }

  return { state, sendToChild };
}
