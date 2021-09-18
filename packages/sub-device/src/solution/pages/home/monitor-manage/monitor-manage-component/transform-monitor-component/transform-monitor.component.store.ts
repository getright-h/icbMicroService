import { ITransformMonitorState } from './transform-monitor.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { ITransformMonitorProps } from './transform-monitor.interface';
import { Form } from 'antd';
import { MonitorService } from '~/solution/model/services/monitor.service';
import { DataNode } from 'rc-tree/lib/interface';
import { getCheckedList } from '~/framework/util/common/treeFunction';
import { useEffect, useRef } from 'react';
import { ShowNotification } from '~/framework/util/common';
import { OrganizationExportFunction } from '~/solution/components/organization-controller-component/organization-controller.interface';

export function useTransformMonitorStore(props: ITransformMonitorProps) {
  const { state, setStateWrap } = useStateStore(new ITransformMonitorState());
  const [form] = Form.useForm();
  const organizationControllerRef: { current: OrganizationExportFunction } = useRef();

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
    // 选择的时候，是更新现在已经展开的树， 未展开的树还是可以点击
    organizationControllerRef.current.setSingleCheckTreeData(checkedKeys[0]);
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
    setStateWrap({ submitLoading: true });
    monitorService.transferGroup({ ...param }).subscribe(
      (res: any) => {
        setStateWrap({ submitLoading: false });
        ShowNotification.success('转组成功');
        props.close && props.close(true);
      },
      (error: any) => {
        setStateWrap({ submitLoading: false });
        console.log(error);
      }
    );
  }
  useEffect(() => {
    return () => {};
  }, [JSON.stringify(props?.data)]);
  return { state, form, organizationControllerRef, close, onSubmit, onchange, onExpand, onCheck, queryChildInfo };
}
