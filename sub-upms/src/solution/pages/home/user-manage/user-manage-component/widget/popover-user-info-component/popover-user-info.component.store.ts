import { IPopoverUserInfoState } from './popover-user-info.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { UserManageService } from '~/solution/model/services/user-manage.service';
import { ShowNotification } from '~/framework/util/common';

export function usePopoverUserInfoStore() {
  const { state, setStateWrap } = useStateStore(new IPopoverUserInfoState());
  const userManageService: UserManageService = useService(UserManageService);
  /**
   * @param userId 查询用户所属机构、部门、岗位
   */
  function getUserBelongDetails(userId: string) {
    userManageService.queryOrganizationInfoByUserId(userId).subscribe(
      (res: any) => {
        setStateWrap({ data: res, visible: true });
      },
      (err: string) => {
        ShowNotification.error(err);
      }
    );
  }

  function close(visible: boolean) {
    !visible && setStateWrap({ visible });
  }
  return { state, getUserBelongDetails, close };
}
