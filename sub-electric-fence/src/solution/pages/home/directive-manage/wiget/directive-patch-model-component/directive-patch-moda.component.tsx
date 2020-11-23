import { Form, Modal, Radio, Input, Select, Button } from 'antd';
import * as React from 'react';
import { useDirectiveListStore } from './directive-patch-moda.component.store';
import { IDirectiveModalProps } from './directive-list.interface';
export default function DirectivePatchModalComponent(props: IDirectiveModalProps) {
  const { visible, close } = props;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };
  return (
    <Modal title={'下发指令'} visible={visible} onOk={() => close && close()}>
      <Form {...formItemLayout}>
        <Form.Item label="关联设备">
          <Radio.Group>
            <Radio value={0}>设备号</Radio>
            <Radio value={1}>监控组</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="指令类型"></Form.Item>
        <Form.Item label="参数选择">
          <Radio.Group>
            <Radio value={0}>设备号</Radio>
            <Radio value={1}>监控组</Radio>
          </Radio.Group>
          <Button>自定义</Button>
        </Form.Item>
        <Form.Item label="指令值"></Form.Item>
        <Form.Item label="指令密码"></Form.Item>
      </Form>
    </Modal>
  );
}
