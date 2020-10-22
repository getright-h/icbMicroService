import * as React from 'react';
import { IDeviceLineProp } from './device-route-modal.interface';
import { useDeviceRouteModalStore } from './device-route-modal.component.store';
import { Modal, Form, Steps, Row, Col } from 'antd';
const { Step } = Steps;
export default function DeviceRouteModalComponent(props: IDeviceLineProp) {
  const { state, onSubmit } = useDeviceRouteModalStore(props);
  const { visible, data } = props;
  return (
    <Modal visible={visible} title={'查看节点详情'} onOk={onSubmit} onCancel={onSubmit}>
      <Form>
        <Form.Item label={'设备号'}>{data.typeName || '-'}</Form.Item>
        <Form.Item label={'节点详情'}>
          <Steps progressDot current={1} direction="vertical">
            <Step
              description={
                <Row gutter={[8, 8]}>
                  <Col span={10}>2020年10月20日10:55:06</Col>
                  <Col span={8}>仓库</Col>
                  <Col span={6}>备注:</Col>
                </Row>
              }
            />
          </Steps>
        </Form.Item>
      </Form>
    </Modal>
  );
}
