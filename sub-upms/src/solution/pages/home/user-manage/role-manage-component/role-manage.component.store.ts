import { IRoleManageState } from './role-manage.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { RoleManageService } from '~/solution/model/services/role-manage.service';
import { ShowNotification } from '~/framework/util/common';

export function useRoleManageStore() {
  const { state, setStateWrap } = useStateStore(new IRoleManageState());
  const roleManageService: RoleManageService = useService(RoleManageService);

  function getRoleTableData() {
    setStateWrap({ isLoading: true });
    roleManageService.queryRoleList({ systemId: process.env.SYSTEM_ID }).subscribe(
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
  }

  useEffect(() => {
    getRoleTableData();
  }, []);

  return { state, tableAction };
}
