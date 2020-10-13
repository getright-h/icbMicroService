import * as React from 'react';
import style from './create-allocation.component.less';
import { useCreateAllocationStore } from './create-allocation.component.store';
import { Form, Input, Checkbox, Select, Space, Button, InputNumber } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { IHeaderTitleComponent, ISelectLoadingComponent } from '~framework/components/component.module';
export default function CreateAllocationComponent() {
  const { state, onChange, createNewAllocation, removeTypeDevice, updateTypeDevice } = useCreateAllocationStore();
  const { searchForm = {}, submitLoading } = state;
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };
  return (
    <div className={style.mainForm}>
      <IHeaderTitleComponent pageName={'创建调拨单'} />
      <Form {...layout} initialValues={{ devices: [{}] }}>
        <div className={style.formPart}>
          <div className={style.formItems}>
            <div className={style.formLeft}>
              <Form.Item name="name" label="调拨单名称" wrapperCol={{ span: 8 }} rules={[{ required: true }]}>
                <Input placeholder="请输入调拨单名称" onChange={e => onChange(e.target.value || '', 'name')} />
              </Form.Item>
              <Form.Item name="name" label="调拨模板" wrapperCol={{ span: 8 }} rules={[{ required: true }]}>
                <ISelectLoadingComponent
                  reqUrl="queryAllotFlowTemplatePagedList"
                  placeholder="选择调拨模板"
                  getCurrentSelectInfo={(value: string, option: any) => {
                    onChange(value || '', 'allotTemplateId');
                  }}
                />

                <a href="">添加模板</a>
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
                            <ISelectLoadingComponent
                              reqUrl="queryDeviceTypeList"
                              placeholder="请选择设备型号"
                              getCurrentSelectInfo={(value: string, option: any) => {
                                updateTypeDevice({ value, option, field }, 'type');
                              }}
                            />
                          </Form.Item>
                          <Form.Item {...field} name={[field.name, 'number']} className={`${style.fieldItem}`}>
                            <InputNumber
                              placeholder="请输入设备数量"
                              style={{ width: 200 }}
                              onChange={e => updateTypeDevice({ number: e, field } || '', 'number')}
                            />
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
                                  removeTypeDevice(field);
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
                <Input.TextArea placeholder="请输入备注" onChange={e => onChange(e.target.value || '', 'remark')} />
              </Form.Item>
              <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
                <Button type="primary" onClick={createNewAllocation} loading={submitLoading}>
                  提交审批
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
