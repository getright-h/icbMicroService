import { ITransformMonitorState } from './transform-monitor.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { ITransformMonitorProps } from './transform-monitor.interface';
import { Form } from 'antd';
import { MonitorService } from '~/solution/model/services/monitor.service';
import { DataNode } from 'rc-tree/lib/interface';
import { getCheckedList } from '~/framework/util/common/treeFunction';
import { useEffect } from 'react';
import { ShowNotification } from '~/framework/util/common';
export function useTransformMonitorStore(props: ITransformMonitorProps) {
  const { state, setStateWrap } = useStateStore(new ITransformMonitorState());
  const [form] = Form.useForm();
  const monitorService = useService(MonitorService);
  function close() {
    form.resetFields();
    props.close && props.close();
  }

  function onSubmit() {
    form.validateFields().then(values => {
      console.log(values);
      transferGroup(values);
    });
  }

  function onchange(e: any, type: string) {
    if (type == 'isCopy') {
      form.setFieldsValue({
        [type]: e.target.checked
      });
    }
  }

  function onExpand(expandedKeys: []) {
    setStateWrap({
      expandedKeys
    });
  }
  function onCheck(treeData: DataNode[], checkedKeys: any = state.checkedKeys) {
    const checkedObject = getCheckedList(treeData, checkedKeys);
    console.log(checkedKeys, checkedObject);
    form.setFieldsValue({
      selectedGroupIdList: checkedKeys
    });
    setStateWrap({
      checkedKeys,
      checkedObject
    });
  }

  const queryChildInfo = (item: any) => {
    if (!item) return null;
    return monitorService.queryVehicleGroupList(item);
  };

  function transferGroup(params: any) {
    const { currentMonitorGroup = {}, selectedRowKeys = [] } = props.data;
    const { id = ' ' } = currentMonitorGroup;
    const param: any = {
      groupId: id,
      vehicleIdList: selectedRowKeys.length ? selectedRowKeys : [props.data.vehicleId],
      ...params
    };
    monitorService.transferGroup({ ...param }).subscribe(
      (res: any) => {
        ShowNotification.success('转组成功');
        props.close && props.close(true);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  useEffect(() => {
    return () => {};
  }, [JSON.stringify(props?.data)]);
  return { state, form, close, onSubmit, onchange, onExpand, onCheck, queryChildInfo };
}
