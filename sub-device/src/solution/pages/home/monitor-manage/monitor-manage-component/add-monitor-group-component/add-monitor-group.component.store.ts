import { IAddMonitorGroupState, AddMonitorGroupProp } from './add-monitor-group.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { MonitorService } from '~/solution/model/services/monitor.service';
import { useEffect } from 'react';
import { Subscription } from 'rxjs';
import { Form } from 'antd';
import { ShowNotification } from '~/framework/util/common';
import { EventBus } from '~framework/util/common';
const event = EventBus.getEventBus('treeData');

export function useAddMonitorGroupStore(props: AddMonitorGroupProp) {
  const { state, setStateWrap } = useStateStore(new IAddMonitorGroupState());
  const monitorService = useService(MonitorService);
  let insertVehicleGroupSubscription: Subscription;
  const [form] = Form.useForm();
  console.log(event);
  function addMonitorGroup(value: any) {
    const { organization = {} } = state;
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
          new Promise((reslove: any) => {
            event.publish(props?.data.organizationId, props?.data, reslove, 'queryStoreOrganizationListSub');
          });

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
      setStateWrap({
        organization: {
          organizationCode: value.code,
          organizationId: value.organizationId,
          organizationName: value.name
        }
      });
      return;
    }
    form.setFieldsValue({
      [type]: value
    });
  }
  useEffect(() => {
    form.resetFields();
    const { data = {} } = props;
    setStateWrap({
      organization: {
        organizationCode: data.organizationCode,
        organizationId: data.organizationId,
        organizationName: data.organizationName
      }
    });
    form.setFieldsValue(data);
    return () => {
      insertVehicleGroupSubscription && insertVehicleGroupSubscription.unsubscribe();
    };
  }, [JSON.stringify(props.data)]);
  return { state, form, onchange, addMonitorGroup, close };
}
