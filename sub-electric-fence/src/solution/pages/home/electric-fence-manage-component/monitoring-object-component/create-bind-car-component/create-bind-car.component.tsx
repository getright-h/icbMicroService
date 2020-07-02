import * as React from 'react';
import style from './create-bind-car.component.less';
import { Input, Form, Switch, Radio, Button } from 'antd';
import { useCreateBindCarStore } from './create-bind-car.component.store';
export default function CreateBindCarComponent() {
  const { form, state } = useCreateBindCarStore();
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 }
  };
  return (
    <div className={style.test}>
      <Form name="validate_other" form={form} {...formItemLayout}>
        <Form.Item label="围栏名称" name="name">
          <Input placeholder="请输入围栏名称" />
        </Form.Item>
        <Form.Item name="outAttention" label="驶出提醒" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="inAttention" label="驶入提醒" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </div>
  );
}
