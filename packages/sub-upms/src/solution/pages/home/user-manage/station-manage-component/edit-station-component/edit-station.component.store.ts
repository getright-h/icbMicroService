import { IEditStationProps, IEditStationState } from './edit-station.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useContext } from 'react';
import { StationManageService } from '~/solution/model/services/station-manage.service';
import { FormInstance } from 'antd/lib/form';
import { Subscription } from 'rxjs';
import { ShowNotification } from '~/framework/util/common';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { GlobalContext } from '~/solution/context/global/global.provider';

export function useEditStationStore(props: IEditStationProps, form: FormInstance) {
  const { gState }: IGlobalState = useContext(GlobalContext);
  const { state, setStateWrap } = useStateStore(new IEditStationState());
  const stationManageService = useService(StationManageService);
  let getRoleListSubscription: Subscription;

  function initForm() {
    const info = props.info;
    if (props.isEdit) {
      form.setFieldsValue({
        name: info.name,
        roles: info.roleList.map((item: { id: string }) => item.id),
        instruction: info.instruction,
        state: info.state
      });
      getRoleList();
    } else {
      form.setFieldsValue({
        state: true
      });
    }
  }
  function getRoleList() {
    getRoleListSubscription = stationManageService
      .queryRoleList({
        userId: gState.myInfo.userId,
        systemId: gState.myInfo.systemId
      })
      .subscribe((res: any) => {
        const initRoles = form.getFieldValue('roles');
        const responseRoles = res.map((item: { id: string }) => item.id);
        const existRoles = initRoles.filter((role: string) => responseRoles.includes(role));
        form.setFieldsValue({ roles: existRoles });
        setStateWrap({ roleList: res });
      });
  }
  function selectOrganization(value: string, option: Record<string, any>) {
    form.setFieldsValue({ parentOrganizationId: value, parentDepartmentId: '' });
    setStateWrap({ parentCode: value ? option.info.code : '' });
  }
  function selfClose(isSuccess = false) {
    props.close && props.close(isSuccess);
  }
  function selfSubmit(values: Record<string, any>) {
    setStateWrap({ confirmLoading: true });
    if (props.isEdit) {
      stationManageService.setStation({ ...values, id: props.info.id }).subscribe(
        (res: any) => {
          ShowNotification.success('编辑成功！');
          setStateWrap({ confirmLoading: false });
          form.resetFields();
          selfClose(true);
        },
        (err: any) => {
          ShowNotification.error(err);
          setStateWrap({ confirmLoading: false });
        }
      );
    } else {
      stationManageService.addStation(values).subscribe(
        (res: any) => {
          ShowNotification.success('添加成功！');
          setStateWrap({ confirmLoading: false });
          form.resetFields();
          selfClose(true);
        },
        (err: any) => {
          ShowNotification.error(err);
          setStateWrap({ confirmLoading: false });
        }
      );
    }
  }
  useEffect(() => {
    props.visible && initForm();
  }, [props.visible]);
  return { state, selfClose, selfSubmit, getRoleList, selectOrganization };
}
