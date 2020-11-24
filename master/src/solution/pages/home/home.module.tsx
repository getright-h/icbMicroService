import * as React from 'react';
import { Layout, Spin, Button } from 'antd';
import style from './home.component.less';
import { MenuComponent } from '~/solution/components/component.module';
import { IHomeHeaderComponent } from '../../components/base/i-home-header-component/i-home-header.component';
import { useHomeStore } from './home.component.store';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

function HomeModule(props: any) {
  const { state, sendToChild } = useHomeStore();
  const { gState }: IGlobalState = React.useContext(GlobalContext);
  const location = useLocation();
  function getCurrentExpandList(currentUrl: string): string[] {
    let target = '';
    const expandList: string[] = [];
    currentUrl
      .split('/')
      .filter(item => item)
      .forEach((element, index) => {
        target += `/${element}`;
        index && expandList.push(target);
      });
    return expandList;
  }

  function renderLayoutSider() {
    const currentUrl = location.pathname;
    const expandList: string[] = getCurrentExpandList(currentUrl);

    return (
      <Layout.Sider theme="light" trigger={null} collapsible collapsed={gState.collapsed}>
        <MenuComponent currentUrl={currentUrl} menuList={state.menuList} expandList={expandList} />
      </Layout.Sider>
    );
  }

  function renderLayoutContainer() {
    return (
      <Layout.Content>
        <div id="subapp-viewport"></div>
      </Layout.Content>
    );
  }

  return (
    <Spin spinning={state.loading} wrapperClassName="custom-layout-spin">
      <Layout>
        <div className={style.homeMain}>
          <IHomeHeaderComponent></IHomeHeaderComponent>
          <div className={style.bodyContainer}>
            {renderLayoutSider()}
            <div className={style.pageContainer}>{renderLayoutContainer()}</div>
          </div>
        </div>
      </Layout>
    </Spin>
  );
}

export default connect(state => state)(HomeModule);
