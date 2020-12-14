import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { IHomeProps } from './home.interface';
import { useEffect } from 'react';
import { setState } from '~/framework/microAPP/appStore';
import registerMainApp from '~/framework/microAPP/appRegister';
export function useHomeStore() {
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
