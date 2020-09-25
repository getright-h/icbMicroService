import * as React from 'react';
import { useAddShippingSpaceStore } from './add-shipping-space.component.store';
import { Modal, Form, Input, Switch } from 'antd';
import { WarehouseListManageContext } from '../warehouse-list.component';

export default function AddShippingSpaceComponent() {
  const { state, handleOk, handleCancel, form } = useAddShippingSpaceStore();
  const { reduxState } = React.useContext(WarehouseListManageContext);
  const { addShippingSpaceVisible } = reduxState;
  const { confirmLoading } = state;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };
  return (
    <Modal
      title="添加仓位"
      destroyOnClose
      visible={addShippingSpaceVisible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form {...layout} form={form}>
        <Form.Item name="name" label="仓库名" rules={[{ required: true }]} initialValue="">
          <Input placeholder="请输入仓库名" />
        </Form.Item>
        <Form.Item name="positionAddress" label="请输入货架位置" initialValue="">
          <Input placeholder="请输入货架位置" />
        </Form.Item>
        <Form.Item label="库存报警">
          <Input.Group compact>
            <Form.Item name="minAlarm" noStyle initialValue="">
              <Input style={{ width: 100, textAlign: 'center' }} type="number" suffix="个" placeholder="请输入" />
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
            <Form.Item name="maxAlarm" noStyle initialValue="">
              <Input
                type="number"
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
        <Form.Item name="alarmDay" label="长时报警" initialValue="">
          <Input
            type="number"
            style={{
              width: 100,
              textAlign: 'center'
            }}
            suffix="天"
            placeholder="请输入"
          />
        </Form.Item>
        <Form.Item name="isDefault" label="默认仓位" initialValue={true}>
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
}
