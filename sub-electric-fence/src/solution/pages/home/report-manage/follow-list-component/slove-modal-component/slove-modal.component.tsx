import { Form, Modal, Radio, Input, Select, Button, Switch } from 'antd';
import React from 'react';
import style from './slove-modal.component.less';
import { useDirectiveModalStore } from './slove-modal.component.store';
import { IDirectiveModalProps, ModalType } from './slove-modal.interface';
export default function DirectivePatchModalComponent(props: IDirectiveModalProps) {
  const { visible, close } = props;
  const { state, form, submitForm, callbackAction, selfClose } = useDirectiveModalStore(props);
  const { custom, isDevice } = state;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 }
    }
  };

  return (
    <Modal title={'下发指令'} visible={visible} onOk={submitForm} onCancel={selfClose} width={'700px'}>
      <Form {...formItemLayout} form={form}>
        <Form.Item label="选中个数" name="deivce"></Form.Item>

        <Form.Item label="处理方式" name={'directiveType'}>
          <Select onChange={() => callbackAction(ModalType.FORM)}>
            <Select.Option value={1}>跟进</Select.Option>
            <Select.Option value={1}>解除警报</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="通知车主" name={'params'}>
          <Switch />
        </Form.Item>
        <Form.Item label="通知方式" name={'directiveType'}>
          <Select onChange={() => callbackAction(ModalType.FORM)}>
            <Select.Option value={1}>短信</Select.Option>
            <Select.Option value={1}>电话</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="短信模板" name={'directiveType'} style={{ position: 'relative' }}>
          <div>
            <Input.TextArea placeholder="多行输入" style={{ height: 200 }} />
            <Button style={{ position: 'absolute', right: '-30%', top: 0 }}>发送短信</Button>
          </div>
        </Form.Item>

        <Form.Item label="跟进备注" name={'directiveValue'}>
          <Input placeholder="单行输入" />
        </Form.Item>
        <Form.Item label="下次跟进提醒" name={'directivePasswd'}>
          <Select onChange={() => callbackAction(ModalType.FORM)}>
            <Select.Option value={1}>30分钟后</Select.Option>
            <Select.Option value={1}>60分钟后</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
