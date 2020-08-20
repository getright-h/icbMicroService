import * as React from 'react';
import style from './create-allocation.component.less';
import { useCreateAllocationStore } from './create-allocation.component.store';
import { Form, Input, Checkbox, Select, Space, Button } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

export default function CreateAllocationComponent() {
  const { state, form } = useCreateAllocationStore();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };
  return (
    <div className={style.mainForm}>
      <div className={style.title}>
        <h1>创建调拨单</h1>
      </div>
      <Form {...layout} form={form} initialValues={{ devices: [{}] }}>
        <div className={style.formPart}>
          <div className={style.formItems}>
            <div className={style.formLeft}>
              <Form.Item name="name" label="调拨单名称" wrapperCol={{ span: 8 }} rules={[{ required: true }]}>
                <Input placeholder="请输入调拨单名称" />
              </Form.Item>
              <Form.Item name="name" label="调拨模板" wrapperCol={{ span: 8 }} rules={[{ required: true }]}>
                <Select placeholder="请选择调拨模板" />
              </Form.Item>
              <Form.Item name="name" label="流程节点（勾选多选项）" rules={[{ required: true }]}>
                <Checkbox defaultChecked>仓库间流程</Checkbox>
              </Form.Item>

              <Form.List name="devices">
                {(fields, { add, remove }) => {
                  return (
                    <Form.Item
                      label="选择调拨设备"
                      required={true}
                      className="form-item"
                      style={{ alignItems: 'start', marginBottom: 0 }}
                    >
                      {fields.map((field, index) => (
                        <Space key={field.key} className={style.space} align="start">
                          <Form.Item {...field} name={[field.name, 'type']} className={style.fieldItem}>
                            <Select placeholder="请选择设备型号"></Select>
                          </Form.Item>
                          <Form.Item {...field} name={[field.name, 'number']} className={style.fieldItem}>
                            <Input placeholder="请输入设备数量" />
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

              <Form.Item name="remark" label="备注" wrapperCol={{ span: 8 }}>
                <Input placeholder="请输入备注" />
              </Form.Item>
              <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  确定
                </Button>
                <Button style={{ marginLeft: '30px' }}>取消</Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
