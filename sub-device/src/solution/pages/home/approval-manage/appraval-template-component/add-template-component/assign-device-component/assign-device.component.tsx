import * as React from 'react';
import style from './assign-device.component.less';
import { useAssignDeviceStore } from './assign-device.component.store';
import { Input, Select } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

export default function AssignDeviceComponent() {
  const { state } = useAssignDeviceStore();
  return (
    <div style={{ display: 'flex' }}>
      <Select disabled placeholder="选择设备型号" />
      <Input disabled placeholder="填写设备数量" style={{ marginLeft: '10px' }} />
      <PlusCircleOutlined style={{ margin: '0 3px', lineHeight: '32px' }} />
    </div>
  );
}
