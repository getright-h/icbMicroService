import { ISelectGroupState, ISelectGroupProps } from './select-group.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { UserManageService } from '~/solution/model/services/user-manage.service';
import { ShowNotification } from '~/framework/util/common';
import { useEffect } from 'react';

export function useSelectGroupStore(props: ISelectGroupProps) {
  const { state, setStateWrap } = useStateStore(new ISelectGroupState());
  const userManageService: UserManageService = useService(UserManageService);
  const { selectValues } = props;

  function queryPositionRuleList(positionId: string) {
    if (positionId) {
      userManageService.queryPositionRoleList(positionId).subscribe(
        (res: any) => {
          const relateRoles: string[] = [];
          const relateRolesText = res
            .map((role: any) => {
              relateRoles.push(role.roleId);
              return role.roleName;
            })
            .join('，');
          setStateWrap({ relateRolesText });
          props.sendRelateRoles(relateRoles, props.index);
        },
        (err: string) => {
          ShowNotification.error(err);
        }
      );
    } else {
      setStateWrap({ relateRolesText: '无' });
    }
  }
  function formatSearchForm() {
    const { searchDepartForm, searchPositionForm } = state;
    searchDepartForm.parentCode = selectValues.organizationCode;
    searchPositionForm.parentCode = selectValues.departmentCode || selectValues.organizationCode;
    setStateWrap({ searchDepartForm, searchPositionForm });
  }
  useEffect(() => {
    if (selectValues) {
      formatSearchForm();
      selectValues.positionId ? queryPositionRuleList(selectValues.positionId) : queryPositionRuleList('');
    }
  }, [JSON.stringify(selectValues)]);

  return { state };
}
