import { IMenu } from '~components/base/menu-component/menu.interface';
import { MenuService } from '~/framework/util/menu/menu.service';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { IHomeProps } from './home.interface';
import { useEffect } from 'react';
import { setState } from '~/framework/microAPP/appStore';
import { fetchChildAppsConfig } from '~/framework/microAPP/fetchChildAppsConfig';
import registerMainApp from '~/framework/microAPP/appRegister';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
export function useHomeStore() {
  const dispatch = useDispatch();
  const { state, setStateWrap } = useStateStore(new IHomeProps());
  const history = useHistory();
  console.log('history =>>>', history);

  useEffect(() => {
    console.log(1122);

    // 注册并启动微前端
    registerMainApp(callback);
  }, []);

  function callback(result: any) {
    console.log('result', result);
    // 如果当前的URL是Home那么就跳转到第一个页面
    // if
    setStateWrap({ menuList: result, loading: false });
    if (history.location.pathname == '/home') {
      if (result[0]?.children?.length) {
        history.replace(result[0].children[0].path);
      } else {
        history.replace(result[0].path);
      }
    }
  }

  function sendToChild() {
    setState({ test: 'test' });
  }

  return { state, sendToChild };
}
