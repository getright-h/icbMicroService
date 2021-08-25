import * as React from 'react';
import { useAddShippingSpaceStore } from './add-shipping-space.component.store';
import { Modal, Form, Input, Switch } from 'antd';
import { IAddShippingSpaceProps } from './add-shipping-space.interface';

export default function AddShippingSpaceComponent(props: IAddShippingSpaceProps) {
  const { state, handleOk, handleCancel, form } = useAddShippingSpaceStore(props);
  const { confirmLoading } = state;
  const { addShippingSpaceVisible } = props;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };
  return (
    <Modal
      title={`${props.isEdit ? '编辑仓位' : '添加仓位'}`}
      centered={true}
      destroyOnClose
      visible={addShippingSpaceVisible}
      onOk={() => {
        form
          .validateFields()
          .then(() => {
            handleOk();
          })
          .catch(e => console.log(e));
      }}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form {...layout} form={form} initialValues={{ isDefault: true }}>
        <Form.Item name="name" label="仓位名" rules={[{ required: true }]}>
          <Input placeholder="请输入仓位名" />
        </Form.Item>
        <Form.Item name="positionAddress" label="请输入货架位置">
          <Input placeholder="请输入货架位置" />
        </Form.Item>
        <Form.Item label="库存报警">
          <Input.Group compact>
            <Form.Item name="minAlarm" noStyle rules={[{ pattern: /^[0-9]*$/, message: '请输入正整数' }]}>
              <Input
                style={{ width: 100, textAlign: 'center' }}
                type="number"
                min={0}
                suffix="个"
                placeholder="请输入"
              />
            </Form.Item>
            <Input
              className="site-input-split"
              style={{
                width: 30,
                borderLeft: 0,
                borderRight: 0,
                pointerEvents: 'none'
              }}
              placeholder="~"
              disabled
            />
            <Form.Item name="maxAlarm" noStyle rules={[{ pattern: /^[0-9]*$/, message: '请输入正整数' }]}>
              <Input
                type="number"
                min={0}
                className="site-input-right"
                style={{
                  width: 100,
                  textAlign: 'center'
                }}
                suffix="个"
                placeholder="请输入"
              />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item name="alarmDay" label="长时报警" rules={[{ pattern: /^[0-9]*$/, message: '请输入正整数' }]}>
          <Input
            type="number"
            min={0}
            style={{
              width: 100,
              textAlign: 'center'
            }}
            suffix="天"
            placeholder="请输入"
          />
        </Form.Item>
        <Form.Item name="isDefault" label="默认仓位" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
}
