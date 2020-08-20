import * as React from 'react';
import style from './device-stock-in.component.less';
import { useDeviceStockInStore } from './device-stock-in.component.store';
import { IDeviceStockInProps } from './device-stock-in.interface';
import { Modal, Form, Input, Select } from 'antd';

export default function DeviceStockInComponent(props: IDeviceStockInProps) {
  const { state, form, selfSubmit, selfClose } = useDeviceStockInStore(props);
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
          <Form.Item name="name" label="设备型号" rules={[{ required: true }]}>
            <Select allowClear placeholder="请输入采购单号"></Select>
          </Form.Item>
          <Form.Item name="name" label="设备号/SIM卡号" rules={[{ required: true }]}>
            <Input.TextArea placeholder="请输入设备号/SIM卡号，可添加多个设备，提行切换" />
          </Form.Item>
          <Form.Item name="name" label="入库仓库" rules={[{ required: true }]}>
            <Input.Group compact>
              <Form.Item
                name={['address', 'province']}
                noStyle
                rules={[{ required: true, message: 'Province is required' }]}
              >
                <Select placeholder="选择仓库"></Select>
              </Form.Item>
              <Form.Item
                name={['address', 'street']}
                noStyle
                rules={[{ required: true, message: 'Street is required' }]}
              >
                <Select placeholder="选择仓位"></Select>
              </Form.Item>
              <a href="">添加仓库/仓位</a>
            </Input.Group>
          </Form.Item>
          <Form.Item name="name" label="设备状态" rules={[{ required: true }]}>
            <Select allowClear placeholder="请选择设备状态"></Select>
          </Form.Item>
          <Form.Item name="name" label="采购单">
            <Select allowClear placeholder="请输入采购单号"></Select>
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
  return (
    <Modal
      title="设备入库"
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
