import * as React from 'react';
import { IDeviceLineProp } from './device-route-modal.interface';
import { useDeviceRouteModalStore } from './device-route-modal.component.store';
import { Modal, Form, Steps, Row, Col } from 'antd';
const { Step } = Steps;
export default function DeviceRouteModalComponent(props: IDeviceLineProp) {
  const { state, onSubmit } = useDeviceRouteModalStore(props);
  const { visible, data } = props;
  console.log(data, 777);
  return (
    <Modal visible={visible} title={'查看节点详情'} onOk={onSubmit} onCancel={onSubmit}>
      <Form>
        <Form.Item label={'设备号'}>{data.typeName ? data.typeName : '-'}</Form.Item>
        <Form.Item label={'节点详情'}>
          <Steps progressDot direction="vertical">
            {data.flowList &&
              Array.isArray(data.flowList) &&
              data.flowList.map((flow: any) => (
                <Step
                  key={flow.id}
                  description={
                    <Row gutter={[8, 8]}>
                      <Col span={10}>{flow.createTime}</Col>
                      <Col span={8}>{flow.storePositionName}</Col>
                      <Col span={6}>{flow.remark}</Col>
                    </Row>
                  }
                />
              ))}
          </Steps>
        </Form.Item>
      </Form>
    </Modal>
  );
}
