import * as React from 'react';
import { Layout, Spin } from 'antd';
import style from './home.component.less';
import { MenuComponent } from '~/framework/components/component.module';
import { IHomeHeaderComponent } from '~/framework/components/component.module';
import { useHomeStore } from './home.component.store';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { useLocation } from 'react-router-dom';
import { RoutesService } from '~/framework/util/routes/routes.service';
import { homeRoutes } from './home.routes';
import TagView from '../../components/tags-view-component/tags-view.component';
function HomeModule(props: any) {
  const { state } = useHomeStore();
  const { gState }: IGlobalState = React.useContext(GlobalContext);
  const location = useLocation();
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
        <MenuComponent currentUrl={currentUrl} menuList={state.menuList} expandList={expandList} />
      </Layout.Sider>
    );
  }
  const RouterInfo = React.useMemo(() => RoutesService.renderRoutes(homeRoutes), []);

  function RenderLayoutContainer() {
    return <Layout.Content>{RouterInfo}</Layout.Content>;
  }

  return (
    <Spin spinning={state.loading} wrapperClassName="custom-layout-spin">
      <Layout>
        <div className={style.homeMain}>
          <IHomeHeaderComponent></IHomeHeaderComponent>

          <div className={style.bodyContainer}>
            {renderLayoutSider()}
            <div className={style.pageContainer}>
              <>
                <TagView />
                {RenderLayoutContainer()}
              </>
            </div>
          </div>
        </div>
      </Layout>
    </Spin>
  );
}

export default React.memo(HomeModule);
