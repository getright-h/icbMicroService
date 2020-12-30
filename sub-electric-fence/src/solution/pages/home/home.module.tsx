import * as React from 'react';
import { Layout, Spin } from 'antd';
import style from './home.component.less';
import { MenuComponent } from '~/solution/components/component.module';
import { IHomeHeaderComponent } from '../../components/base/i-home-header-component/i-home-header.component';
import { useHomeStore } from './home.component.store';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { useLocation, useParams } from 'react-router-dom';
import { RoutesService } from '~/framework/util/routes/routes.service';
import { homeRoutes } from './home.routes';
import { getHashParameter } from '~/solution/shared/util/common.util';
import { StorageUtil } from '~/framework/util/storage';

function HomeModule(props: any) {
  const { state } = useHomeStore();
  const source = getHashParameter('source');
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
      <Layout.Sider trigger={null} collapsible collapsed={gState.collapsed}>
        <MenuComponent currentUrl={currentUrl} menuList={state.menuList} expandList={expandList} />
      </Layout.Sider>
    );
  }

  function renderLayoutContainer() {
    return <Layout.Content>{RoutesService.renderRoutes(homeRoutes)}</Layout.Content>;
  }

  return (
    <Spin spinning={state.loading} wrapperClassName="custom-layout-spin">
      <div className={style.homeMain}>
        {!source && <IHomeHeaderComponent></IHomeHeaderComponent>}
        <div className={style.bodyContainer} style={{ paddingTop: !source ? '6.75rem' : '1rem' }}>
          {!source && renderLayoutSider()}
          <div className={style.pageContainer}>{renderLayoutContainer()}</div>
        </div>
      </div>
    </Spin>
  );
}

export default React.memo(HomeModule);
