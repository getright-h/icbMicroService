import * as React from 'react';
import { Layout, Popover, Spin } from 'antd';
import style from './home.component.less';
import { IHomeHeaderComponent, MenuComponent } from '~/solution/components/component.module';
import { useHomeStore } from './home.component.store';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import TagView from '../../components/base/tags-view-component/tags-view.component';
import IndexComponent from '../public/index-component/index.component';
import TaskCenterComponent from '~/solution/components/custom/task-center-component/task-center.component';
import { UserOutlined } from '@ant-design/icons';

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
      <Layout.Content style={{ display: state.isIndex ? 'none' : 'block' }}>
        <div id="subapp-viewport"></div>
        <div id="mic-loading"></div>
      </Layout.Content>
    );
  }

  function renderExtraHeaderContent() {
    const { userInfo } = state;
    const content = (
      <React.Fragment>
        <div>用户名：{userInfo?.name}</div>
        <div>电话：{userInfo?.telephone}</div>
      </React.Fragment>
    );
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Popover content={content}>
          <div className={style.user}>
            <div className={style.userAvatar}>
              {userInfo?.avatar ? <img src={userInfo?.avatar} alt="" /> : <UserOutlined />}
            </div>
            <div className={style.userInfo}>{userInfo?.name}</div>
          </div>
        </Popover>
        <TaskCenterComponent />
      </div>
    );
  }

  return (
    <Spin spinning={state.loading} wrapperClassName="custom-layout-spin">
      <div className={style.homeMain}>
        <IHomeHeaderComponent extra={renderExtraHeaderContent} />
        <div className={style.bodyContainer}>
          {renderLayoutSider()}
          <div className={style.pageContainer}>
            <>
              <TagView />
              {state.isIndex && <IndexComponent />}
              {renderLayoutContainer()}
            </>
          </div>
        </div>
      </div>
    </Spin>
  );
}

export default connect(state => state)(HomeModule);
