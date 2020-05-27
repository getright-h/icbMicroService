import { hot } from 'react-hot-loader';
import * as React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { useGlobalContext } from '../context/global/global.provider';
import { HashRouter } from 'react-router-dom';
import MainReducer from '../context/redux/reducer/index';
import { RoutesService } from '~/framework/util/routes/routes.service';
import { ChildrenObject } from '~/framework/microAPP/microAppModal';
moment.locale('zh-cn');

const App = (props: { routers: Array<ChildrenObject>; routerBase: string }) => {
  console.log(props);

  // const App = (props?: {appRoutes: any}) => {
  const { routers, routerBase } = props;
  // 项目内部用的hooks provicer
  const { GlobalProvider } = useGlobalContext();
  // 主项目用的store 主要用来接收子应用传来的信息
  const store = createStore(MainReducer);
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <GlobalProvider>
          <HashRouter basename={routerBase}>{RoutesService.renderRoutes(routers)}</HashRouter>
        </GlobalProvider>
      </Provider>
    </ConfigProvider>
  );
};

export default hot(module)(App);
