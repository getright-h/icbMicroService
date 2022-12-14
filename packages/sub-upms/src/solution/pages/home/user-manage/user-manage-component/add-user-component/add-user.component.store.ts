import { IAddUserState, IAddUserProps } from './add-user.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { UserManageService } from '~/solution/model/services/user-manage.service';
import { OrganizationId } from '~/solution/model/dto/user-manage.dto';
import { ShowNotification } from '~/framework/util/common';
import { RoleManageService } from '~/solution/model/services/role-manage.service';
import { useEffect, useRef, useContext } from 'react';
import _ from 'lodash';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { GlobalContext } from '~/solution/context/global/global.provider';

export function useAddUserStore(props: IAddUserProps) {
  const { userId, isEdit, visible } = props;
  const userManageService: UserManageService = useService(UserManageService);
  const roleManageService: RoleManageService = useService(RoleManageService);
  const { gState }: IGlobalState = useContext(GlobalContext);
  const { state, setStateWrap } = useStateStore(new IAddUserState());
  const [userForm] = Form.useForm();
  const relateRoles = useRef({});

  useEffect(() => {
    if (gState.myInfo.systemId && gState.myInfo.userId) {
      getRoleOptions();
    }
  }, [gState.myInfo.systemId, gState.myInfo.userId]);

  useEffect(() => {
    if (userId && visible) {
      getDetails(userId);
    }
  }, [userId, visible]);

  /**
   * @param userId 查询机构详情
   */
  function getDetails(userId: string) {
    userManageService.getUserDetail(userId).subscribe(
      (res: any) => {
        const roleList = res.rolesCodeList
          ? res.rolesCodeList.map((role: { id: string; code: string; positionId: string }) => {
              return JSON.stringify({ roleId: role.id, roleCode: role.code });
            })
          : [];
        userForm.setFieldsValue({ ...res, roleList });
        getUserBelongDetails(userId);
      },
      (err: string) => {
        ShowNotification.error(err);
      }
    );
  }
  /**
   * @param userId 查询用户所属机构、部门、岗位
   */
  function getUserBelongDetails(userId: string) {
    userManageService.queryOrganizationInfoByUserId(userId).subscribe(
      (res: any) => {
        const values = res.map((o: any) => _.omit(o, ['userId', 'roleList']));
        userForm.setFieldsValue({ ['organizationIds']: values });
      },
      (err: string) => {
        ShowNotification.error(err);
      }
    );
  }

  function handleOrganSelect(option: any, index: number, type: string) {
    const organizationIds: OrganizationId[] = userForm.getFieldsValue(['organizationIds']).organizationIds;
    !organizationIds[index] && (organizationIds[index] = {});
    organizationIds[index][`${type}Id`] = option ? option.info.id : undefined;
    organizationIds[index][`${type}Code`] = option ? option.info.code : undefined;
    organizationIds[index][`${type}Name`] = option ? option.info.name : undefined;
    if (type == 'organization') {
      organizationIds[index]['systemId'] = option ? option.info.systemId : undefined;
    }
    userForm.setFieldsValue([organizationIds]);
  }

  function getRoleOptions() {
    roleManageService.queryRoleList({ systemId: gState.myInfo.systemId, userId: gState.myInfo.userId }).subscribe(
      (res: any) => {
        setStateWrap({ roleOptions: res });
      },
      (err: any) => {
        ShowNotification.error(err);
      }
    );
  }

  function onSubmit(values: any) {
    values.roleList && (values.roleList = values.roleList.map((v: string) => JSON.parse(v)));
    setStateWrap({ confirmLoading: true });
    if (isEdit) {
      userManageService.setUser({ ...values, id: userId, systemCode: gState.myInfo.systemCode }).subscribe(
        (res: any) => {
          ShowNotification.success('编辑用户成功');
          setStateWrap({ confirmLoading: false });
          props.close(true);
          userForm.resetFields();
        },
        (err: string) => {
          setStateWrap({ confirmLoading: false });
          ShowNotification.error(err);
        }
      );
    } else {
      userManageService.insertUser({ ...values, systemCode: gState.myInfo.systemCode }).subscribe(
        (res: any) => {
          ShowNotification.success('添加用户成功！');
          setStateWrap({ confirmLoading: false });
          props.close(true);
          userForm.resetFields();
        },
        (err: string) => {
          setStateWrap({ confirmLoading: false });
          ShowNotification.error(err);
        }
      );
    }
  }

  function sendRelateRoles(roles: string[], index: number) {
    relateRoles.current[index] = roles;
    dealWithRelateRoles();
  }
  function dealWithRelateRoles() {
    const positionRoles: string[] = [];
    for (const i in relateRoles.current) {
      positionRoles.push(...relateRoles.current[i]);
    }
    _.uniq(positionRoles);
    setStateWrap({ positionRoles });
  }

  return {
    state,
    userForm,
    onSubmit,
    handleOrganSelect,
    sendRelateRoles
  };
}
