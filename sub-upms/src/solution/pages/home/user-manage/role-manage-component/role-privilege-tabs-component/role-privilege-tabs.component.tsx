import * as React from 'react';
import style from './role-privilege-tabs.component.less';
import { Tabs, Checkbox, Collapse, Tooltip } from 'antd';
import { IRolePrivilegeTabsProps } from './role-privilege-tabs.interface';
import { useRolePrivilegeTabsStore } from './role-privilege-tabs.component.store';

function RolePrivilegeTabsComponent(props: IRolePrivilegeTabsProps) {
  const { state, changeCheckPrivileges, tabChange } = useRolePrivilegeTabsStore(props);
  const { privilegeModelList, activeCollapses, customMenuList, checkedValues } = state;
  return (
    <Tabs onChange={tabChange}>
      {customMenuList &&
        customMenuList.map(menu => {
          return (
            <Tabs.TabPane tab={menu.menuName} key={menu.menuId}>
              <Checkbox.Group
                onChange={checkedValue => changeCheckPrivileges(checkedValue, menu)}
                defaultValue={checkedValues}
              >
                <Collapse defaultActiveKey={activeCollapses}>
                  {privilegeModelList.map(privilegeModel => {
                    return (
                      <Collapse.Panel header={privilegeModel.name} key={privilegeModel.id}>
                        {privilegeModel.privileges.map(privilege => (
                          <Tooltip placement="top" title={privilege.code} key={privilege.id}>
                            <Checkbox
                              // value={{ privilegeId: privilege.id, privilegeCode: privilege.code }}
                              value={privilege.id}
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
  );
}
export default React.memo(RolePrivilegeTabsComponent);
