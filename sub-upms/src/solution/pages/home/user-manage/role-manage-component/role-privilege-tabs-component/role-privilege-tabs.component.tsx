import * as React from 'react';
import style from './role-privilege-tabs.component.less';
import { Tabs, Checkbox, Collapse, Tooltip, Button, Empty } from 'antd';
import { IRolePrivilegeTabsProps } from './role-privilege-tabs.interface';
import { useRolePrivilegeTabsStore } from './role-privilege-tabs.component.store';
import RoleMenuComponent from '../role-menu-component/role-menu.component';

function RolePrivilegeTabsComponent(props: IRolePrivilegeTabsProps) {
  const {
    state,
    changeCheckPrivileges,
    tabChange,
    submitMenuRelation,
    getCheckedMenuNodes
  } = useRolePrivilegeTabsStore(props);
  const { privilegeModelList, activeCollapses, customMenuList, checkedValues, checkedMenuKeys, isLoading } = state;

  function renderHeader() {
    return (
      <React.Fragment>
        <h4>权限列表</h4>
        <Button type="primary" onClick={() => submitMenuRelation()} loading={isLoading}>
          保存
        </Button>
      </React.Fragment>
    );
  }

  function renderTabs() {
    return customMenuList != undefined ? (
      <Tabs onChange={tabChange}>
        {customMenuList &&
          customMenuList.map(menu => {
            return (
              <Tabs.TabPane tab={menu.menuName} key={menu.menuId}>
                <Checkbox.Group
                  onChange={checkedValue => changeCheckPrivileges(checkedValue, menu)}
                  defaultValue={checkedValues && checkedValues.map(o => JSON.stringify(o))}
                >
                  <Collapse defaultActiveKey={activeCollapses}>
                    {activeCollapses &&
                      privilegeModelList.map(privilegeModel => {
                        return (
                          <Collapse.Panel header={privilegeModel.name} key={privilegeModel.id}>
                            {privilegeModel.privileges.map(privilege => (
                              <Tooltip placement="top" title={privilege.code} key={privilege.id}>
                                <Checkbox
                                  value={JSON.stringify({ privilegeId: privilege.id, privilegeCode: privilege.code })}
                                >
                                  {privilege.name}
                                </Checkbox>
                              </Tooltip>
                            ))}
                          </Collapse.Panel>
                        );
                      })}
                  </Collapse>
                </Checkbox.Group>
              </Tabs.TabPane>
            );
          })}
      </Tabs>
    ) : (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>请选择菜单项</span>} />
    );
  }
  return (
    <React.Fragment>
      <div className={style.header}>{renderHeader()}</div>
      <div className={style.main}>
        <div className={style.left}>
          <RoleMenuComponent
            systemId={props.systemId}
            checkedKeys={checkedMenuKeys}
            getCheckedNodes={getCheckedMenuNodes}
          ></RoleMenuComponent>
        </div>
        <div className={style.right}>{renderTabs()}</div>
      </div>
    </React.Fragment>
  );
}
export default React.memo(RolePrivilegeTabsComponent);
