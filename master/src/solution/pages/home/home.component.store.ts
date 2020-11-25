import { IMenu } from '~components/base/menu-component/menu.interface';
import { MenuService } from '~/framework/util/menu/menu.service';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { IHomeProps } from './home.interface';
import { useEffect } from 'react';
import { setState } from '~/framework/microAPP/appStore';
import { fetchChildAppsConfig } from '~/framework/microAPP/fetchChildAppsConfig';
import registerMainApp from '~/framework/microAPP/appRegister';
import { useStore, useDispatch, useSelector } from 'react-redux';
export function useHomeStore() {
  const dispatch = useDispatch();
  const { state, setStateWrap } = useStateStore(new IHomeProps());

  useEffect(() => {
    // 注册并启动微前端
    registerMainApp(callback);
  }, []);

  function callback(result: any) {
    setStateWrap({ menuList: result, loading: false });
  }

  function sendToChild() {
    setState({ test: 'test' });
  }

  return { state, sendToChild };
}
