import * as React from 'react';
import style from './device-edit.component.less';
import { useDeviceEditStore } from './device-edit.component.store';
import { IDeviceEditProps } from './device-edit.interface';
import { Modal, Form, Input, Select, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

export default function DeviceEditComponent(props: IDeviceEditProps) {
  const { state, form, selfSubmit, selfClose, changeToEdit } = useDeviceEditStore(props);
  const { visible } = props;
  const { confirmLoading, isEdit } = state;

  function renderDetail() {
    const layout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 12 }
    };
    return (
      <div className={style.detail}>
        <div className={style.detailLeft}>
          <Form {...layout} size="small">
            <Form.Item label="设备型号">ICB308-OBD</Form.Item>
            <Form.Item label="设备号/SIM卡号">25641210000</Form.Item>
            <Form.Item label="入库仓库" wrapperCol={{ span: 18 }}>
              总部仓库-良品仓
            </Form.Item>
            <Form.Item label="设备状态">正常</Form.Item>
            <Form.Item label="在库时长">100天</Form.Item>
            <Form.Item label="采购单">564115841141140</Form.Item>
            <Form.Item label="入库人">浅钱</Form.Item>
          </Form>
        </div>
        <div className={style.detailRight}>
          <a onClick={changeToEdit}>编辑</a>
        </div>
      </div>
    );
  }
  function renderForm() {
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };
    return (
      <React.Fragment>
        <Form {...layout} form={form}>
          <Form.Item name="name" label="设备型号" rules={[{ required: true }]}>
            <Select allowClear placeholder="请输入采购单号" style={{ width: 200 }}></Select>
          </Form.Item>
          <Form.Item name="name" label="设备号/SIM卡号" rules={[{ required: true }]}>
            <Input placeholder="请输入设备号/SIM卡号" style={{ width: 200 }} />
          </Form.Item>
          <Form.Item name="name" label="入库仓库" rules={[{ required: true }]} wrapperCol={{ span: 18 }}>
            <Input.Group compact>
              <Form.Item
                name={['address', 'province']}
                noStyle
                rules={[{ required: true, message: 'Province is required' }]}
              >
                <Select placeholder="选择仓库" style={{ width: 150 }}></Select>
              </Form.Item>
              <Form.Item
                name={['address', 'street']}
                noStyle
                rules={[{ required: true, message: 'Street is required' }]}
              >
                <Select placeholder="选择仓位" style={{ width: 150 }}></Select>
              </Form.Item>
              <span className={style.aLink}>
                <a href="">添加仓库/仓位</a>
              </span>
            </Input.Group>
          </Form.Item>
          <Form.Item name="name" label="设备状态" rules={[{ required: true }]}>
            <Select allowClear placeholder="请选择设备状态" style={{ width: 200 }}></Select>
          </Form.Item>
          <Form.Item name="name" label="采购单">
            <Select allowClear placeholder="请输入采购单号" style={{ width: 200 }}></Select>
            <Tooltip className={style.aLink} placement="right" title="关联采购单可帮助您追溯采购时间、成本等">
              <InfoCircleOutlined className={style.tip} />
            </Tooltip>
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
  return (
    <Modal
      title="设备详情"
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
      {isEdit ? renderForm() : renderDetail()}
    </Modal>
  );
}
