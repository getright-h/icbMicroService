import React from 'react';
import style from './stock-record.component.less';
import { Modal, Descriptions, Form } from 'antd';
import { useStockRecordStore } from './stock-record.component.store';
import { IStockRecordProps } from './stock-record.interface';

export default function StockRecordComponent(props: IStockRecordProps) {
  const { state, selfClose } = useStockRecordStore(props);
  const { visible } = props;
  const { details } = state;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { offset: 1, span: 11 }
  };
  function renderInfo() {
    return (
      <Form {...layout}>
        <Form.Item label="仓库名">{details.storeName}</Form.Item>
        <Form.Item label="方式">{details.typeText}</Form.Item>
        {/* <Form.Item label="接收方">{details.}</Form.Item> */}
        <Form.Item label="数量">
          {details.deviceTypeList?.map(device => (
            <span key={device.typeId}>
              {device.typeName}，{device.number}个
            </span>
          ))}
        </Form.Item>
        {/* <Form.Item label="操作人">{details.}</Form.Item> */}
        <Form.Item label="操作时间">{details.createTime}</Form.Item>
        {/* <Form.Item label="采购单">{details.}</Form.Item> */}
      </Form>
    );
  }
  return (
    <Modal
      title="出入库详情"
      centered={true}
      visible={visible}
      width={600}
      onCancel={selfClose}
      footer={null}
      maskClosable={false}
      destroyOnClose={true}
    >
      {details && renderInfo()}
    </Modal>
  );
}
