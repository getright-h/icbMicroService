import { IMenu } from '~components/base/menu-component/menu.interface';
import { HomeService } from '~/solution/model/services/home.service';
import { MenuService } from '~/framework/util/menu/menu.service';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { IHomeProps } from './home.interface';
import { useEffect } from 'react';
import React from 'react';
import { Subscription } from 'rxjs';
import { PAGES_MENU } from '~/solution/shared/constant/common.const';
import { ShowNotification } from '~/framework/util/common';
import { setMyInfo } from '~/solution/context/global/store/global.action';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { IGlobalState } from '~/solution/context/global/global.interface';
export function useHomeStore() {
  const homeService = useService(HomeService);
  const menuService = useService(MenuService);
  let currentUserIndoSubscription: Subscription;
  const { dispatch }: IGlobalState = React.useContext(GlobalContext);
  const { state, setStateWrap } = useStateStore(new IHomeProps());

  useEffect(() => {
    getMenuAndAuth();
    getCurrentUserInfo();
    return () => {
      // menuAndAuthSubscription.unsubscribe();
      currentUserIndoSubscription.unsubscribe();
    };
  }, []);

  function getMenuAndAuth() {
    setStateWrap({ menuList: menuService.updateMenuByRoutes(PAGES_MENU.MENU), loading: false });
    // menuAndAuthSubscription = homeService.getMenuAndAuthKeys().subscribe((menuList: { data: IMenu[] }) => {
    //   setStateWrap({ menuList: menuService.updateMenuByRoutes(menuList.data), loading: false });
    // });
  }

  // 获取登录用户信息
  function getCurrentUserInfo() {
    currentUserIndoSubscription = homeService.getMyInfo().subscribe(
      (res: any) => {
        dispatch(setMyInfo(res));
      },
      (err: any) => {
        ShowNotification.error(err);
      }
    );
  }

  return { state };
}
