import { IAddMonitorGroupState, ISetAlarmProp } from './set-alarm-model.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { MonitorService } from '~/solution/model/services/monitor.service';
import { useEffect } from 'react';
import { Subscription } from 'rxjs';
import { Form } from 'antd';
import { ShowNotification } from '~/framework/util/common';

export function useSetAlarmStore(props: ISetAlarmProp) {
  const { state, setStateWrap } = useStateStore(new IAddMonitorGroupState());
  const monitorService = useService(MonitorService);
  let insertVehicleGroupSubscription: Subscription;
  const [form] = Form.useForm();
  const organization = {
    organizationCode: props?.data.organizationCode,
    organizationId: props?.data.organizationId,
    organizationName: props?.data.organizationName
  };
  function addMonitorGroup(value: any) {
    const params = {
      name: value.name,
      remark: value.remark,
      roleId: value.roleId,
      ...organization
    };
    setStateWrap({ submitLoading: true });
    if (props?.data.id) {
      insertVehicleGroupSubscription = monitorService.setVehicleGroup({ ...params, id: props?.data.id }).subscribe(
        (res: any) => {
          console.log(res);
          ShowNotification.success('修改成功');
          setStateWrap({ submitLoading: false });
          close();
        },
        (error: any) => {
          setStateWrap({ submitLoading: false });
        }
      );
    } else {
      insertVehicleGroupSubscription = monitorService.insertVehicleGroup({ ...params }).subscribe(
        (res: any) => {
          console.log(res);
          ShowNotification.success('添加成功');
          setStateWrap({ submitLoading: false });
          close();
        },
        (error: any) => {
          setStateWrap({ submitLoading: false });
        }
      );
    }
  }
  function close() {
    form.resetFields();
    props.close && props.close();
  }
  function onchange(value: any, type: string) {
    if (type == 'organizationId') {
      organization.organizationCode = value.code;
      organization.organizationId = value.organizationId;
      organization.organizationName = value.name;
      return;
    }
    form.setFieldsValue({
      [type]: value
    });
  }
  useEffect(() => {
    form.resetFields();
    const { data = {} } = props;
    form.setFieldsValue(data);
    console.log(form);
    return () => {
      insertVehicleGroupSubscription && insertVehicleGroupSubscription.unsubscribe();
    };
  }, [JSON.stringify(props.data)]);
  return { state, form, onchange, addMonitorGroup, close };
}
