import React from 'react';
import style from './role-manage.component.less';
import RolePrivilegeTabsComponent from './role-privilege-tabs-component/role-privilege-tabs.component';
import { roleColumns } from './role-columns';
import { Table } from 'antd';
import { useRoleManageStore } from './role-manage.component.store';

export default function RoleManageComponent() {
  const { state, tableAction } = useRoleManageStore();
  const { roleList, isLoading, roleId, systemId } = state;
  function renderSide() {
    return (
      <React.Fragment>
        <h4>角色组</h4>
        <div className={style.roleTable}>
          <Table
            columns={roleColumns(tableAction, roleId)}
            dataSource={roleList}
            loading={isLoading}
            pagination={false}
            rowKey={row => row.id}
          />
        </div>
      </React.Fragment>
    );
  }
  function renderMain() {
    return (
      <React.Fragment>
        <RolePrivilegeTabsComponent roleId={roleId} systemId={systemId} />
      </React.Fragment>
    );
  }
  return (
    <div className={style.layout}>
      <div className={style.side}>{renderSide()}</div>
      <div className={style.container}>{renderMain()}</div>
    </div>
  );
}
