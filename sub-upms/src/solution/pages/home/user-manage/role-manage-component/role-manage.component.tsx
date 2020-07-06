import * as React from 'react';
import style from './role-manage.component.less';
import RoleMenuComponent from './role-menu-component/role-menu.component';
import RolePrivilegeTabsComponent from './role-privilege-tabs-component/role-privilege-tabs.component';
import { roleColumns } from './role-columns';
import { Table, Button } from 'antd';
import { useRoleManageStore } from './role-manage.component.store';

export default function RoleManageComponent() {
  const { state, tableAction, getCheckedMenuNodes, submitMenuRelation, getSubmitMenuList } = useRoleManageStore();
  const { roleList, isLoading, checkedMenuKeys, checkNodeEvent, roleId, systemId, roleDetailMenuList } = state;
  function renderSide() {
    return (
      <React.Fragment>
        <h4>角色组</h4>
        <Table
          className={style.roleTable}
          columns={roleColumns(tableAction, roleId)}
          dataSource={roleList}
          loading={isLoading}
          pagination={false}
          rowKey={row => row.id}
        />
      </React.Fragment>
    );
  }
  function renderHeader() {
    return (
      <React.Fragment>
        <h4>权限列表</h4>
        <Button type="primary" onClick={() => submitMenuRelation()}>
          保存
        </Button>
      </React.Fragment>
    );
  }
  function renderMain() {
    return (
      <React.Fragment>
        <div className={style.left}>
          <RoleMenuComponent
            systemId={systemId}
            checkedKeys={checkedMenuKeys}
            getCheckedNodes={getCheckedMenuNodes}
          ></RoleMenuComponent>
        </div>
        <div className={style.right}>
          <RolePrivilegeTabsComponent
            systemId={systemId}
            menuList={roleDetailMenuList}
            checkNodeEvent={checkNodeEvent}
            getSubmitMenuList={getSubmitMenuList}
          />
        </div>
      </React.Fragment>
    );
  }
  return (
    <div className={style.layout}>
      <div className={style.side}>{renderSide()}</div>
      <div className={style.container}>
        <div className={style.header}>{renderHeader()}</div>
        <div className={style.main}>{renderMain()}</div>
      </div>
    </div>
  );
}
