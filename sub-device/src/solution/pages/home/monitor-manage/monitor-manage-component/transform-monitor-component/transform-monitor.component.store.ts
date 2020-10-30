import { ITransformMonitorState } from './transform-monitor.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { ITransformMonitorProps } from './transform-monitor.interface';
import { Form } from 'antd';
import { MonitorService } from '~/solution/model/services/monitor.service';
import { DataNode } from 'rc-tree/lib/interface';
import { getCheckedList } from '~/framework/util/common/treeFunction';
import { useEffect } from 'react';
export function useTransformMonitorStore(props: ITransformMonitorProps) {
  const { state, setStateWrap } = useStateStore(new ITransformMonitorState());
  const [form] = Form.useForm();
  const monitorService = useService(MonitorService);
  function close() {
    form.resetFields();
    props.close && props.close();
  }

  function onSubmit() {
    form.validateFields().then(res => {
      console.log(res);
    });
  }

  function onchange(e: any, type: string) {
    if (type == 'copy') {
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
    setStateWrap({
      checkedKeys,
      checkedObject
    });
  }

  const queryChildInfo = (item: any) => {
    if (!item) return null;
    return monitorService.queryVehicleGroupList(item);
  };
  useEffect(() => {
    return () => {};
  }, [JSON.stringify(props?.data)]);
  return { state, form, close, onSubmit, onchange, onExpand, onCheck, queryChildInfo };
}
