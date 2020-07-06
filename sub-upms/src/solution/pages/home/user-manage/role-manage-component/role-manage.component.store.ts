import { IRoleManageState, PrivilegeMenuItem, MenuTreeNode } from './role-manage.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef } from 'react';
import { RoleManageService } from '~/solution/model/services/role-manage.service';
import { ShowNotification } from '~/framework/util/common';

export function useRoleManageStore() {
  const { state, setStateWrap } = useStateStore(new IRoleManageState());
  const roleManageService: RoleManageService = useService(RoleManageService);

  function getRoleTableData() {
    setStateWrap({ isLoading: true });
    roleManageService
      .queryRoleList({ userId: '25658bc026f3c8d9550808d8182b35fd', systemId: process.env.SYSTEM_ID })
      .subscribe(
        (res: any) => {
          setStateWrap({ roleList: res, isLoading: false });
        },
        (err: any) => {
          setStateWrap({ isLoading: false });
          ShowNotification.error(err);
        }
      );
  }

  function tableAction(roleId: string, systemId: string) {
    setStateWrap({ roleId, systemId });
    getRoleDetail(roleId);
  }

  function getRoleDetail(roleId: string) {
    roleManageService.getRoleMenuPrivilegeDetail(roleId).subscribe(
      (res: any) => {
        setStateWrap({ roleDetailMenuList: res.menuList });
        setCheckedMenuNodes(res.menuList);
      },
      (err: any) => {
        ShowNotification.error(err);
      }
    );
  }

  function getCheckedMenuNodes(checkedMenuKeys: string[], e: any) {
    const checkNodeEvent = {
      checked: e.checked,
      menuId: e.node.key,
      menuName: e.node.title
    };
    setStateWrap({ checkedMenuKeys, checkNodeEvent });
  }

  function setCheckedMenuNodes(menuList: PrivilegeMenuItem[]) {
    const list = menuList ? menuList.map((item: PrivilegeMenuItem) => item.menuId) : null;
    setStateWrap({ checkedMenuKeys: list });
  }

  function submitMenuRelation() {
    setStateWrap({ roleId: '' });
  }

  function getSubmitMenuList(menuList: PrivilegeMenuItem[]) {
    console.log('getSubmitMenuList', menuList);
  }

  useEffect(() => {
    getRoleTableData();
  }, []);

  return { state, tableAction, getCheckedMenuNodes, submitMenuRelation, getSubmitMenuList };
}
