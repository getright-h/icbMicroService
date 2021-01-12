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
    const { organization } = state;
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
          props.alertCurrentTreeData(props?.data.id, params.name);
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
          props.appendNewNodeToCurrentTreeData({ ...params, id: res });
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
      setStateWrap({
        organization: {
          organizationCode: value.code,
          organizationId: value ? value.organizationId : '',
          organizationName: value.name
        }
      });
      return;
    }
    if (type == 'roleId') {
      setStateWrap({ searchRoleName: value });
      form.setFieldsValue({
        roleId: value
      });
    }
  }
  useEffect(() => {
    form.resetFields();
    const { data = {} } = props;
    setStateWrap({
      organization: {
        organizationCode: data.organizationCode,
        organizationId: data.organizationId,
        organizationName: data.organizationName
      },
      searchRoleName: data.roleName
    });
    form.setFieldsValue(data);
    return () => {
      insertVehicleGroupSubscription && insertVehicleGroupSubscription.unsubscribe();
    };
  }, [JSON.stringify(props.data)]);
  return { state, form, onchange, addMonitorGroup, close };
}
