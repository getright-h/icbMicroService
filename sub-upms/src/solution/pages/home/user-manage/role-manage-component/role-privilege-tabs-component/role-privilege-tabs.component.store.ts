import { IRolePrivilegeTabsState, IRolePrivilegeTabsProps } from './role-privilege-tabs.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef } from 'react';
import { ShowNotification } from '~/framework/util/common';
import { RoleManageService } from '~/solution/model/services/role-manage.service';
import { CheckNodeEvent, PrivilegeMenuItem } from '../role-manage.interface';
import _ from 'lodash';

export function useRolePrivilegeTabsStore(props: IRolePrivilegeTabsProps) {
  const { state, setStateWrap } = useStateStore(new IRolePrivilegeTabsState());
  const roleManageService: RoleManageService = useService(RoleManageService);

  const tabKey = useRef('');

  // 获得该系统下权限组
  function getPrivilegeModelList(systemId: string) {
    roleManageService.getSystemPrivileges(systemId).subscribe(
      (res: any) => {
        const activeCollapses: string[] = [];
        res.forEach((item: any) => {
          activeCollapses.push(item.id);
        });
        setStateWrap({ privilegeModelList: res, activeCollapses });
      },
      (err: any) => {
        ShowNotification.error(err);
      }
    );
  }

  // 多选框选择
  function changeCheckPrivileges(checkedValues: any[], menu: PrivilegeMenuItem) {
    console.log(checkedValues, menu);
  }

  // 菜单多选框变化时处理 角色、菜单、权限关系对象
  function formatCustomMenuList(checkNodeEvent: CheckNodeEvent) {
    console.log(checkNodeEvent);

    const { customMenuList } = state;
    if (checkNodeEvent.checked) {
      customMenuList.push({
        menuId: checkNodeEvent.menuId,
        menuName: checkNodeEvent.menuName,
        privilegeList: []
      });
    } else {
      _.remove(customMenuList, { menuId: checkNodeEvent.menuId });
      tabKey.current = customMenuList[0].menuId || '';
    }
    console.log(customMenuList);
    setStateWrap({ customMenuList });
  }

  // 所选标签页改变
  function tabChange(activeKey: string) {
    tabKey.current = activeKey;
    console.log('tabchange', tabKey.current);
  }

  // 所选角色变化时若系统id变化，获取新的权限组
  useEffect(() => {
    getPrivilegeModelList(props.systemId);
  }, [props.systemId]);

  // 获取角色详情中绑定菜单及权限信息，初始化标签页
  useEffect(() => {
    if (props.menuList) {
      setStateWrap({ customMenuList: props.menuList });
      tabKey.current = props.menuList && props.menuList[0].menuId;
    }
  }, [props.menuList]);

  // 菜单多选框变化
  useEffect(() => {
    props.checkNodeEvent && formatCustomMenuList(props.checkNodeEvent);
  }, [props.checkNodeEvent]);

  // 所选标签页改变时，获取当前菜单已选权限
  useEffect(() => {
    console.log(tabKey.current);
    let checkedValues: string[] = [];
    if (tabKey.current) {
      const currentList = _.find(state.customMenuList, { menuId: tabKey.current }).privilegeList;
      if (currentList) {
        checkedValues = currentList.map(item => item.privilegeId);
      }
    }
    console.log(checkedValues);
    setStateWrap({ checkedValues });
  }, [tabKey.current]);

  return { state, changeCheckPrivileges, tabChange };
}
