import * as React from 'react';
import style from './edit-order.component.less';
import { useEditOrderStore } from './edit-order.component.store';
import { IEditOrderProps } from './edit-order.interface';
import { Modal, Form, Input } from 'antd';

export default function EditOrderComponent(props: IEditOrderProps) {
  const { state, form, selfSubmit, selfClose } = useEditOrderStore(props);
  const { visible } = props;
  const { confirmLoading } = state;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };
  function renderForm() {
    return (
      <React.Fragment>
        <Form {...layout} form={form}>
          <Form.Item name="name" label="名称" rules={[{ required: true }]}>
            <Input placeholder="请输入名称" />
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
  return (
    <Modal
      title="标题"
      visible={visible}
      width={600}
      onCancel={selfClose}
      onOk={() => {
        form
          .validateFields()
          .then(values => selfSubmit(values))
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
      maskClosable={false}
      destroyOnClose={true}
      confirmLoading={confirmLoading}
    >
      {renderForm()}
    </Modal>
  );
}
