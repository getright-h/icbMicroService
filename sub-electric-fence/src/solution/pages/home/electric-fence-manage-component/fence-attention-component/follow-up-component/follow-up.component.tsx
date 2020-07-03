import * as React from 'react';
import style from './follow-up.component.less';
import { Button, Input, Modal, Form, Select, DatePicker } from 'antd';
import { useFollowUpStore } from './follow-up.component.store';

export default function FollowUpComponent() {
  const [form] = Form.useForm();
  const { state } = useFollowUpStore(form);
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
        initialValues={{ remember: true }}
        form={form}

        // onFinishFailed={onFinishFailed}
      >
        <Form.Item name="status" label="跟进状态" wrapperCol={{ span: 6 }}>
          <Select placeholder="请选择">
            <Option value="已处理">已处理</Option>
            <Option value="未处理">未处理</Option>
          </Select>
        </Form.Item>

        <Form.Item name="remark" label="跟进备注">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </div>
  );
}
