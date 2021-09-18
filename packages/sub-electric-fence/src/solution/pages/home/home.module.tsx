import * as React from 'react';
import { Layout, Spin } from 'antd';
import style from './home.component.less';
import { IMenuComponent } from '@fch/fch-shop-web';
import { useHomeStore } from './home.component.store';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { useLocation } from 'react-router-dom';
import { RoutesService } from '~/framework/util/routes/routes.service';
import { homeRoutes } from './home.routes';
import { getHashParameter } from '~/solution/shared/util/common.util';
import { StorageUtil } from '@fch/fch-tool';
import { IconList } from './home.interface';
import HocHomeHeaderComponent from '~/solution/HOC/hoc-home-header-component/hoc-home-header.component';

function HomeModule() {
  const { state } = useHomeStore();
  const source = getHashParameter('source');
  const { menuList } = state;
  const { gState }: IGlobalState = React.useContext(GlobalContext);
  const location = useLocation();
  React.useEffect(() => {
    getHashParameter('token') && StorageUtil.setLocalStorage('token', getHashParameter('token'));
    getHashParameter('source') && StorageUtil.setLocalStorage('source', getHashParameter('source'));
  }, []);
  function getCurrentExpandList(currentUrl: string): string[] {
    let target = '';
    const expandList: string[] = [];
    currentUrl
      .split('/')
      .filter(item => item)
      .forEach(element => {
        target += `/${element}`;
        expandList.push(target);
      });

    return expandList;
  }

  function renderLayoutSider() {
    const currentUrl = location.pathname;
    const expandList: string[] = getCurrentExpandList(currentUrl);

    return (
      <Layout.Sider
        trigger={null}
        collapsible
        collapsed={gState.collapsed}
        style={{ height: '80vh', overflow: 'hidden auto' }}
      >
        <IMenuComponent currentUrl={currentUrl} menuList={menuList} iconList={IconList} expandList={expandList} />
      </Layout.Sider>
    );
  }

  const RouterInfo = React.useMemo(() => RoutesService.renderRoutes(homeRoutes), []);

  function RenderLayoutContainer() {
    return <Layout.Content>{RouterInfo}</Layout.Content>;
  }

  return (
    <Spin spinning={state.loading} wrapperClassName="custom-layout-spin">
      <div className={style.homeMain}>
        {!source && <HocHomeHeaderComponent></HocHomeHeaderComponent>}
        <div className={style.bodyContainer} style={{ paddingTop: !source ? '6.75rem' : '1rem' }}>
          {!source && renderLayoutSider()}
          <div className={style.pageContainer}>{RenderLayoutContainer()}</div>
        </div>
      </div>
    </Spin>
  );
}

export default React.memo(HomeModule);
