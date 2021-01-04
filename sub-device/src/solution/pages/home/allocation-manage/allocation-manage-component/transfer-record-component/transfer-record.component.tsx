import React from 'react';
import style from './transfer-record.component.less';
import { useTransferRecordStore } from './transfer-record.component.store';
import { ITransferRecordProps } from './transfer-record.interface';
import { Modal, Form, Row, Col, Button } from 'antd';

export default function TransferRecordComponent(props: ITransferRecordProps) {
  const { state, selfClose } = useTransferRecordStore(props);
  const { visible } = props;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };
  function renderForm() {
    return (
      <React.Fragment>
        <Form {...layout}>
          <Form.Item label="调拨单号">10026464546</Form.Item>
          <Form.Item label="调拨记录">
            <Row>
              <Col span={8}>time</Col>
              <Col span={12} offset={2}>
                record
              </Col>
            </Row>
            <Row>
              <Col span={8}>time2</Col>
              <Col span={12} offset={2}>
                record2
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
  return (
    <Modal
      title="调拨记录"
      visible={visible}
      width={600}
      onCancel={selfClose}
      maskClosable={false}
      destroyOnClose={true}
      footer={[
        <Button key="back" onClick={selfClose}>
          返回
        </Button>
      ]}
    >
      {renderForm()}
    </Modal>
  );
}
