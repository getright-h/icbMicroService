import React from 'react';
import { Layout, Spin } from 'antd';
import style from './home.component.less';
import { IHomeHeaderComponent, MenuComponent } from '~/solution/components/component.module';
import { useHomeStore } from './home.component.store';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import TagView from '../../components/base/tags-view-component/tags-view.component';

function HomeModule() {
  const { state } = useHomeStore();
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
      <Layout.Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={gState.collapsed}
        style={{ height: '80vh', overflow: 'hidden auto' }}
      >
        <MenuComponent currentUrl={currentUrl} menuList={state.menuList} expandList={expandList} />
      </Layout.Sider>
    );
  }

  function renderLayoutContainer() {
    return (
      <Layout.Content>
        <div id="subapp-viewport"></div>
        <div id="mic-loading"></div>
      </Layout.Content>
    );
  }

  return (
    <Spin spinning={state.loading} wrapperClassName="custom-layout-spin">
      {/* <Layout> */}
      <div className={style.homeMain}>
        <IHomeHeaderComponent />
        <div className={style.bodyContainer}>
          {renderLayoutSider()}
          <div className={style.pageContainer}>
            <>
              <TagView />
              {renderLayoutContainer()}
            </>
          </div>
        </div>
      </div>
      {/* </Layout> */}
    </Spin>
  );
}

export default connect(state => state)(HomeModule);
