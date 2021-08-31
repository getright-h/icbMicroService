import { IRoleManageState } from './role-manage.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useContext } from 'react';
import { RoleManageService } from '~/solution/model/services/role-manage.service';
import { ShowNotification } from '~/framework/util/common';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { GlobalContext } from '~/solution/context/global/global.provider';

export function useRoleManageStore() {
  const { gState }: IGlobalState = useContext(GlobalContext);
  const { state, setStateWrap } = useStateStore(new IRoleManageState());
  const roleManageService: RoleManageService = useService(RoleManageService);

  function getRoleTableData() {
    setStateWrap({ isLoading: true });
    roleManageService.queryRoleList({ systemId: gState.myInfo.systemId, userId: gState.myInfo.userId }).subscribe(
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
    gState.myInfo.userId && getRoleTableData();
  }, [gState.myInfo.systemId, gState.myInfo.userId]);

  return { state, tableAction };
}
