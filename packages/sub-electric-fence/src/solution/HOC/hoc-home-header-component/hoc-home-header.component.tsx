import { IHomeHeaderComponent } from '@fch/fch-shop-web';
import * as React from 'react';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { TYPES } from '~/solution/context/global/store/global.type';
import { backLoginFunction } from '~/framework/util/base-http/request.service';

export default function HocHomeHeaderComponent() {
  const { dispatch, gState }: IGlobalState = React.useContext(GlobalContext);

  function renderActionContent() {
    return (
      <div className="actions">
        <a onClick={backLoginFunction} className="a-link">
          注销
        </a>
        <p></p>
        {/* <a onClick={changePwd} className="a-link">
          修改密码
        </a> */}
      </div>
    );
  }
  const props = {
    siteTitle: process.env.SITE_TITLE,
    collapsed: gState.collapsed,
    collapsedChange: () => dispatch({ type: TYPES.SET_COLLAPSED }),
    renderActionContent
  };

  return <IHomeHeaderComponent {...props} />;
}
