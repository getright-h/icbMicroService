import * as React from 'react';
import { IDeviceLineProp } from './device-route-modal.interface';
import { useDeviceRouteModalStore } from './device-route-modal.component.store';
import { Modal, Form, Steps, Popover } from 'antd';
import { DEVICE_ROUTE_ENUM } from '~shared/constant/common.const';
const { Step } = Steps;
export default function DeviceRouteModalComponent(props: IDeviceLineProp) {
  const { state, onSubmit } = useDeviceRouteModalStore(props);
  const { visible, data } = props;

  function renderDeviceSort(flow: any) {
    if (flow.route === DEVICE_ROUTE_ENUM.Loss) {
      // 遗失
      return flow.routeText;
    }

    if (flow.route === DEVICE_ROUTE_ENUM.Allot) {
      // 调拨中
      return '调拨中 等待接口调试';
    }

    if (flow.route === DEVICE_ROUTE_ENUM.Bind) {
      // 绑定车主
      return '调拨中 等待接口调试';
    }
    // 在库
    return `${flow.storeName}-${flow.storePositionName}`;
  }
  return (
    <Modal visible={visible} title={'查看节点详情'} onOk={onSubmit} onCancel={onSubmit} width={700}>
      <Form style={{ width: '100%' }}>
        <Form.Item label={'设备号'}>{data.typeName ? data.typeName : '-'}</Form.Item>
        <Form.Item label={'节点详情'}>
          <Steps progressDot direction="vertical">
            {data.flowList &&
              Array.isArray(data.flowList) &&
              data.flowList.map((flow: any) => (
                <Step
                  key={flow.id}
                  description={
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <p>{flow.createTime}</p>
                      <p style={{ marginLeft: 30, marginRight: 30 }}>{renderDeviceSort(flow)}</p>
                      <p
                        style={{
                          overflow: 'hidden',
                          height: 25,
                          width: 250,
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        <Popover placement="topRight" content={'奥术大师大所多大声道'} trigger="click">
                          <span>备注:{flow.remark || '奥术大师大所多大声道'}</span>
                        </Popover>
                      </p>
                    </div>
                  }
                />
              ))}
          </Steps>
        </Form.Item>
      </Form>
    </Modal>
  );
}
