import * as React from 'react';
import { useTransformMonitorStore } from './transform-monitor.component.store';
import { ITransformMonitorProps } from './transform-monitor.interface';
import { Modal, Form, Checkbox, Input, Switch } from 'antd';
import OrganizationControllerComponent from '~/solution/components/organization-controller-component/organization-controller.component';

export default function TransformMonitorComponent(props: ITransformMonitorProps) {
  const { state, form, close, onSubmit, onchange, onCheck, onExpand, queryChildInfo } = useTransformMonitorStore(props);
  const { visible = false, data = {} } = props;
  const { submitLoading = false, checkedKeys, expandedKeys } = state;
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };
  function RenderTree() {
    const prganizationControllerComponentProps = {
      expandedKeys,
      onExpand,
      getCheckedInfo: onCheck,
      checkedKeys,
      isGroup: true,
      queryChildInfo,
      onlyLeafCanSelect: true
    };
    return (
      <div>
        <OrganizationControllerComponent checkable {...prganizationControllerComponentProps} />
      </div>
    );
  }
  return (
    <Modal
      title={'车辆转组'}
      centered={true}
      visible={visible}
      onCancel={close}
      onOk={onSubmit}
      confirmLoading={submitLoading}
    >
      <Form {...layout} form={form}>
        <Form.Item label={'已选车辆数'}>{data?.selectedRowKeys.length ? data.selectedRowKeys.length : 1}</Form.Item>
        <Form.Item label={'监控组原名'}>{data?.currentMonitorGroup.name}</Form.Item>
        <Form.Item label={'转移目标组名'} name={'selectedGroupIdList'} rules={[{ required: true }]}>
          {RenderTree()}
        </Form.Item>
        <Form.Item style={{ marginLeft: 70 }} name={'copy'}>
          <Checkbox onChange={(e: any) => onchange(e, 'copy')}>复制并移动副本</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
}
