import { IAddMonitorGroupState, AddMonitorGroupProp } from './add-monitor-group.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { MonitorService } from '~/solution/model/services/monitor.service';
import { useEffect } from 'react';
import { Subscription } from 'rxjs';
import { Form } from 'antd';
import { ShowNotification } from '~/framework/util/common';

export function useAddMonitorGroupStore(props: AddMonitorGroupProp) {
  const { state, setStateWrap } = useStateStore(new IAddMonitorGroupState());
  const monitorService = useService(MonitorService);
  let insertVehicleGroupSubscription: Subscription;
  const [form] = Form.useForm();
  function addMonitorGroup(value: any) {
    const { organization = {} } = value;
    const params = {
      name: value.name,
      remark: value.remark,
      roleId: value.roleId,
      organizationCode: organization.code,
      organizationId: organization.organizationId,
      organizationName: organization.name
    };
    setStateWrap({ submitLoading: true });
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
  function close() {
    form.resetFields();
    props.close && props.close();
  }
  function onchange(value: any, type: string) {
    form.setFieldsValue({
      [type]: value
    });
  }
  useEffect(() => {
    return () => {
      insertVehicleGroupSubscription && insertVehicleGroupSubscription.unsubscribe();
    };
  }, [props.data?.id]);
  return { state, form, onchange, addMonitorGroup, close };
}
