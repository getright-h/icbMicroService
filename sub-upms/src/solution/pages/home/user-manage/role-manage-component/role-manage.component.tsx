import * as React from 'react';
import style from './role-manage.component.less';
import { TablePageTelComponent } from '~/solution/components/component.module';

export default function RoleManageComponent() {
  function renderPageLeft() {
    return <h4>角色组</h4>;
  }
  function renderTable() {
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>(菜单)</div>
        <div style={{ width: '50%' }}>(权限列表)</div>
      </div>
    );
  }
  return (
    <TablePageTelComponent
      leftFlex={1}
      rightFlex={5}
      pageName={'角色管理'}
      pageLeft={renderPageLeft()}
      table={renderTable()}
    ></TablePageTelComponent>
  );
}
