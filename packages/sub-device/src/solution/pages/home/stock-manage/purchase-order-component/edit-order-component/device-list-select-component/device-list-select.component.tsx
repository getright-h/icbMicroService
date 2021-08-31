import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Space, Input, Form } from 'antd';
import * as React from 'react';
import { ISelectLoadingComponent } from '~/framework/components/component.module';
import style from './device-list-select.component.less';
import { useDeviceListSelectStore } from './device-list-select.component.store';
import { IDeviceListSelectProps } from './device-list-select.interface';

export default function DeviceListSelectComponent(props: IDeviceListSelectProps) {
  const { state, handleDeviceChange } = useDeviceListSelectStore(props);
  const { field, index, add, remove } = props;

  const queryDeviceTypeList = ISelectLoadingComponent({
    reqUrl: 'queryDeviceTypeList',
    placeholder: '选择设备型号',
    searchKey: state.editTypeName || '',
    getCurrentSelectInfo: (value: string, option: any) => handleDeviceChange('type', option)
  });

  return (
    <Space className={style.space}>
      <Form.Item
        {...field}
        name={[field.name, 'typeId']}
        style={{ width: '200px' }}
        className={style.fieldItem}
        rules={[{ required: true, message: '请选择设备型号' }]}
      >
        {queryDeviceTypeList}
      </Form.Item>
      <Form.Item
        {...field}
        name={[field.name, 'number']}
        style={{ maxWidth: '150px' }}
        className={style.fieldItem}
        rules={[{ required: true, message: '请填写数量' }]}
      >
        <Input placeholder="请填写数量" onChange={e => handleDeviceChange('number', e.target.value)} />
      </Form.Item>
      <Form.Item
        {...field}
        name={[field.name, 'amount']}
        style={{ maxWidth: '150px' }}
        className={style.fieldItem}
        rules={[{ required: true, message: '请填写金额' }]}
      >
        <Input placeholder="请填写金额" prefix="￥" onChange={e => handleDeviceChange('amount', e.target.value)} />
      </Form.Item>
      <div className={style.fieldAddButton}>
        <PlusOutlined
          onClick={() => {
            add();
          }}
        />
        {index != 0 && (
          <MinusOutlined
            onClick={() => {
              remove(field.name);
            }}
          />
        )}
      </div>
    </Space>
  );
}
