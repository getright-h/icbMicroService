import * as React from 'react';
import { useAddMonitorGroupStore } from './add-monitor-group.component.store';
import { ISelectLoadingComponent } from '~framework/components/component.module';
import { AddMonitorGroupProp } from './add-monitor-group.interface';
import { Form, Modal, Input } from 'antd';
export default function AddMonitorGroupComponent(props: AddMonitorGroupProp) {
  const { state, onchange } = useAddMonitorGroupStore(props);
  const { data, visible } = props;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };
  return (
    <Modal visible={visible} title={'添加监控组'} onCancel={() => props.close()}>
      <Form {...layout}>
        <Form.Item label="所在机构" name={'organizationId'} rules={[{ required: true }]}>
          <ISelectLoadingComponent reqUrl={'queryStoreOrganization'} placeholder={'请选择机构'} />
        </Form.Item>
        <Form.Item label="监控组名称" name={'name'} rules={[{ required: true }]}>
          <Input placeholder="请输入监控组名称" onChange={(e: any) => onchange(e.target.value, 'name')} />
        </Form.Item>
        <Form.Item label="监管角色" name={'roleId'} rules={[{ required: true }]}></Form.Item>
        <Form.Item label="备注" name={'remark'}>
          <Input placeholder="请输入备注信息" onChange={(e: any) => onchange(e.target.value, 'remark')} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
