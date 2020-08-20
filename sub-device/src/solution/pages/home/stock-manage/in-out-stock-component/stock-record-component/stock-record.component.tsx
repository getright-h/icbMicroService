import * as React from 'react';
import style from './stock-record.component.less';
import { Modal, Descriptions, Form } from 'antd';
import { useStockRecordStore } from './stock-record.component.store';
import { IStockRecordProps } from './stock-record.interface';

export default function StockRecordComponent(props: IStockRecordProps) {
  const { state, selfClose } = useStockRecordStore(props);
  const { visible } = props;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { offset: 1, span: 11 }
  };
  function renderInfo() {
    return (
      <Form {...layout}>
        <Form.Item label="仓库名">A仓库</Form.Item>
        <Form.Item label="方式">入库</Form.Item>
        <Form.Item label="接收方">B仓库</Form.Item>
        <Form.Item label="数量">OBD-10001，100个</Form.Item>
        <Form.Item label="操作人">孙三</Form.Item>
        <Form.Item label="操作时间">2020-01-01 14:00:00</Form.Item>
        <Form.Item label="采购单">xx批次采购单</Form.Item>
      </Form>
    );
  }
  return (
    <Modal
      title="出入库详情"
      visible={visible}
      width={600}
      onCancel={selfClose}
      footer={null}
      maskClosable={false}
      destroyOnClose={true}
    >
      {renderInfo()}
    </Modal>
  );
}
