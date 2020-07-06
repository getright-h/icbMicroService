import {
  IRolePrivilegeTabsState,
  IRolePrivilegeTabsProps,
  CheckNodeEvent,
  PrivilegeMenuItem
} from './role-privilege-tabs.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { ShowNotification } from '~/framework/util/common';
import { RoleManageService } from '~/solution/model/services/role-manage.service';
import _ from 'lodash';
import { PrivilegeInfo } from '~/solution/model/dto/role-manage.dto';

export function useRolePrivilegeTabsStore(props: IRolePrivilegeTabsProps) {
  const { state, setStateWrap } = useStateStore(new IRolePrivilegeTabsState());
  const roleManageService: RoleManageService = useService(RoleManageService);

  function getRoleDetail(roleId: string) {
    roleManageService.getRoleMenuPrivilegeDetail(roleId).subscribe(
      (res: any) => {
        setStateWrap({ customMenuList: res.menuList });
      },
      (err: any) => {
        ShowNotification.error(err);
      }
    );
  }

  useEffect(() => {
    if (state.customMenuList) {
      state.customMenuList[0] && setCheckedPrivileges(state.customMenuList[0].menuId);
    }
    setCheckedMenuNodes(state.customMenuList);
  }, [state.customMenuList]);

  function getCheckedMenuNodes(checkedMenuKeys: string[], e: any) {
    const checkNodeEvent = {
      checked: e.checked,
      menuId: e.node.key,
      menuName: e.node.title
    };
    setStateWrap({ checkedMenuKeys });
    formatCustomMenuList(checkNodeEvent);
  }

  function setCheckedMenuNodes(menuList: PrivilegeMenuItem[]) {
    const list = menuList ? menuList.map((item: PrivilegeMenuItem) => item.menuId) : [];
    setStateWrap({ checkedMenuKeys: list });
  }

  // 获得该系统下权限组
  function getPrivilegeModelList(systemId: string) {
    roleManageService.getSystemPrivileges(systemId).subscribe(
      (res: any) => {
        const activeCollapses = res.map((item: any) => item.id);
        setStateWrap({ privilegeModelList: res, activeCollapses });
      },
      (err: any) => {
        ShowNotification.error(err);
      }
    );
  }

  // 多选框选择
  function changeCheckPrivileges(checkedValues: any[], menu: PrivilegeMenuItem) {
    const privilegeList: any[] = [];
    checkedValues.forEach(value => privilegeList.push(JSON.parse(value)));
    menu.privilegeList = privilegeList;
  }

  // 菜单多选框变化时处理 角色、菜单、权限关系对象
  function formatCustomMenuList(checkNodeEvent: CheckNodeEvent) {
    let { customMenuList } = state;
    !customMenuList && (customMenuList = []);
    if (checkNodeEvent.checked) {
      customMenuList.push({
        menuId: checkNodeEvent.menuId,
        menuName: checkNodeEvent.menuName,
        privilegeList: []
      });
    } else {
      _.remove(customMenuList, { menuId: checkNodeEvent.menuId });
      customMenuList[0] && setCheckedPrivileges(customMenuList[0].menuId);
    }
    setStateWrap({ customMenuList });
  }

  // 所选标签页改变
  function tabChange(activeKey: string) {
    setCheckedPrivileges(activeKey);
  }

  // 所选标签页改变时，获取当前菜单已选权限
  function setCheckedPrivileges(activeKey: string) {
    let checkedValues: PrivilegeInfo[] = [];
    if (activeKey) {
      checkedValues = _.find(state.customMenuList, { menuId: activeKey }).privilegeList;
    }
    setStateWrap({ checkedValues });
  }

  function submitMenuRelation() {
    setStateWrap({ isLoading: true });
    const { roleId, systemId } = props;
    roleManageService.submitMenuRelation({ roleId, systemId, menuList: state.customMenuList }).subscribe(
      (res: any) => {
        ShowNotification.success('编辑权限成功！');
        setStateWrap({ isLoading: false });
      },
      (err: any) => {
        ShowNotification.error(err);
        setStateWrap({ isLoading: false });
      }
    );
  }

  // 所选角色变化时若系统id变化，获取新的权限组
  useEffect(() => {
    if (props.roleId && props.systemId) {
      setStateWrap({
        customMenuList: [],
        checkedValues: [],
        activeCollapses: [],
        checkedMenuKeys: []
      });
      getPrivilegeModelList(props.systemId);
      getRoleDetail(props.roleId);
    }
  }, [props.systemId, props.roleId]);

  return { state, changeCheckPrivileges, tabChange, submitMenuRelation, getCheckedMenuNodes };
}
