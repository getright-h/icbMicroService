import * as React from 'react';
import { useHomeHeaderStore } from './i-home-header.component.store';
import { HomeOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import style from './i-home-header.component.less';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { TYPES } from '~/solution/context/global/store/global.type';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { IEditPasswordComponent } from '../../component.module';
import { StorageUtil } from '~/framework/util/storage';

// const USERID = StorageUtil.getLocalStorage('userId');
export function IHomeHeaderComponent() {
  const { state, logout, changePwd, popClose } = useHomeHeaderStore();
  const { dispatch, gState }: IGlobalState = React.useContext(GlobalContext);
  function renderActionContent() {
    return (
      <div className="actions">
        <a onClick={logout} className="a-link">
          注销
        </a>
        <p></p>
        <a onClick={changePwd} className="a-link">
          修改密码
        </a>
        <IEditPasswordComponent
          visible={state.passwordVisible}
          userId={StorageUtil.getLocalStorage('userId')}
          close={popClose}
        />
      </div>
    );
  }
  return (
    <div className={style.header}>
      <div className={style.main}>
        <div className={style.container}>
          <div className={style.headerLeft}>
            <div className={style.logoContainer}>
              <div className={style.foldIcon} onClick={() => dispatch({ type: TYPES.SET_COLLAPSED })}>
                {React.createElement(gState.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                {/* <Icon className={style.trigger} type={gState.collapsed ? 'menu-unfold' : 'menu-fold'} /> */}
              </div>
              <div className={style.headerLogo}>
                {/* <img src={logo} /> */}
                <span>风控权限</span>
              </div>
            </div>
          </div>
          <div className={style.headerRight}>
            <Popover content={renderActionContent()} placement="bottom">
              <HomeOutlined />
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}
