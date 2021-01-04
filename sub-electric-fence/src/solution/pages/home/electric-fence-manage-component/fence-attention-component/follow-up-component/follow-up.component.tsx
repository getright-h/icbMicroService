import React from 'react';
import style from './follow-up.component.less';
import { Button, Input, Modal, Form, Select, DatePicker } from 'antd';
import { useFollowUpStore } from './follow-up.component.store';
import { FollowUpComponentProps } from './follow-up.interface';

export default function FollowUpComponent(props: FollowUpComponentProps) {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
  };
  const { Option } = Select;

  return (
    <div className={style.test}>
      <Form
        {...layout}
        name="basic"
        onValuesChange={() => props.onValuesChange({ ...form, id: props.id })}
        initialValues={{ remember: true }}
        form={form}
      >
        <Form.Item name="status" label="跟进状态" wrapperCol={{ span: 6 }}>
          <Select placeholder="请选择">
            <Option value="10">已处理</Option>
            <Option value="0">未处理</Option>
          </Select>
        </Form.Item>

        <Form.Item name="remark" label="跟进备注">
          <Input.TextArea autoSize={{ minRows: 4, maxRows: 6 }} />
        </Form.Item>
      </Form>
    </div>
  );
}
