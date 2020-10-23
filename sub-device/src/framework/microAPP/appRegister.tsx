import { appStore } from './appStore';
import { render, unmountComponentAtNode } from 'react-dom';
import React from 'react';
import App from '~pages/app.component';
import { AppConfig, ChildrenObject } from './microAppModal';
import { appRoutes } from '~/solution/pages/app.routes';
const components = {
  login: () => import('~pages/login/login-component/login.component'),
  home: () => import('~pages/home/home.module')
};

function childProjectLifeCycle() {
  return {
    // 从主程序传来的数据props
    async mount(props: any) {
      console.log('父级的参数', props);
      // 注册应用间通信
      appStore(props);
      // 注册微应用实例化函数
      renderApp(props);
    },
    /**
     * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
     * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
     */
    async bootstrap() {
      console.log('react app bootstraped');
    },
    async unmount(props: any) {
      console.log(1222);

      unmountComponentAtNode(
        props && props.container ? props.container.querySelector('#root') : document.getElementById('root')
      );
    },
    async update(props: any) {
      console.log('update props', props);
    }
  };
}

// 渲染当前子应用
export function renderApp(props?: AppConfig) {
  // 传递过来的路径和该应用下的子路由需要用那些
  // 拼接当前的router, 来自主应用的路由
  // // TODO: 后期需要区分是否作为子应用启动 通过window.__POWERED_BY_QIANKUN__
  // // 返回当前根据routeMatch拼接后的路由

  const routers: any = !!window.__POWERED_BY_QIANKUN__ ? routerMatch(props.routers) : appRoutes;

  const routerBase = !!window.__POWERED_BY_QIANKUN__ ? props.routerBase.replace('/#', '') : '';

  render(
    <App routers={routers} routerBase={routerBase} />,
    props && props.container ? props.container.querySelector('#root') : document.getElementById('root')
  );
}

function routerMatch(routers: Array<ChildrenObject>) {
  const dealRouters = routers.map(router => {
    router.component = components[router.componentUrl];
    return router;
  });
  console.log('dealRouters', dealRouters);

  return dealRouters;
}

export default childProjectLifeCycle;