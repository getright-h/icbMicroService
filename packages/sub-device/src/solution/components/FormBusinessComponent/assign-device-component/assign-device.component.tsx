import * as React from 'react';
import { ISelectLoadingComponent } from '~/framework/components/component.module';
import style from './assign-device.component.less';
import { useAssignDeviceStore } from './assign-device.component.store';
import { Form, Space, Input } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { IAssignDeviceStateProps } from './assign-device.interface';

export default function AssignDeviceComponent(props: IAssignDeviceStateProps) {
  const { state, form, handleDeviceChange } = useAssignDeviceStore(props);
  const queryDeviceTypeList = ISelectLoadingComponent({
    reqUrl: 'queryDeviceTypeList',
    placeholder: '选择设备型号',
    labelInValue: true,
    getCurrentSelectInfo: (value: string, option: any) => handleDeviceChange('type', option)
  });
  return (
    <Form form={form} initialValues={{ deviceList: [{}] }}>
      <Form.List name="deviceList">
        {(fields, { add, remove }) => {
          return (
            <Form.Item required={true} style={{ width: '500px' }}>
              {fields.map((field, index) => (
                <Space className={style.space} key={index}>
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
                    style={{ width: '150px' }}
                    className={style.fieldItem}
                    rules={[{ required: true, message: '请填写数量' }]}
                  >
                    <Input placeholder="请填写数量" onChange={e => handleDeviceChange('number', e.target.value)} />
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
              ))}
            </Form.Item>
          );
        }}
      </Form.List>
    </Form>
  );
}
