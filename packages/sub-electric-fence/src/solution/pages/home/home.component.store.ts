import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { IHomeProps } from './home.interface';
import { useEffect } from 'react';
import { PAGES_MENU } from '~/solution/shared/constant/common.const';
import { MenuService } from '@fch/fch-shop-web';
export function useHomeStore() {
  const menuService = useService(MenuService);
  const { state, setStateWrap } = useStateStore(new IHomeProps());

  useEffect(() => {
    getMenuAndAuth();
  }, []);

  function getMenuAndAuth() {
    setStateWrap({ menuList: menuService.updateMenuByRoutes(PAGES_MENU.MENU), loading: false });
  }

  return { state };
}
