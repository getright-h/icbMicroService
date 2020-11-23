import * as React from 'react';
import style from './create-allocation.component.less';
import { useCreateAllocationStore } from './create-allocation.component.store';
import { Form, Input, Checkbox, Select, Space, Button, InputNumber } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { IHeaderTitleComponent, ISelectLoadingComponent } from '~framework/components/component.module';
export default function CreateAllocationComponent() {
  const {
    state,
    form,
    onChange,
    createNewAllocation,
    removeTypeDevice,
    updateTypeDevice,
    selectAlloactionTemplateFlowNode
  } = useCreateAllocationStore();
  const { searchForm = {}, submitLoading, flowList = [] } = state;
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };

  function ArrowComponent() {
    return (
      <div className={style.arrowWapepr}>
        <div className={style.line}>
          <i className="arrow"></i>
        </div>
      </div>
    );
  }
  return (
    <div className={style.mainForm}>
      <IHeaderTitleComponent pageName={'创建调拨单'} />
      <Form {...layout} initialValues={{ deviceList: [{}] }} form={form}>
        <div className={style.formPart}>
          <div className={style.formItems}>
            <div className={style.formLeft}>
              <Form.Item name={'name'} label="调拨单名称" wrapperCol={{ span: 8 }} rules={[{ required: true }]}>
                <Input placeholder="请输入调拨单名称" onChange={e => onChange(e.target.value || '', 'name')} />
              </Form.Item>
              <Form.Item name="name" label="调拨模板" wrapperCol={{ span: 8 }} rules={[{ required: true }]}>
                <ISelectLoadingComponent
                  reqUrl="queryAllotFlowTemplatePagedList"
                  placeholder="选择调拨模板"
                  selectedValue={searchForm.allotTemplateId}
                  getCurrentSelectInfo={(value: string, option: any) => {
                    onChange(value || '', 'allotTemplateId');
                  }}
                />

                <a href="">添加模板</a>
              </Form.Item>
              <Form.Item name="name" label="流程节点（勾选多选项）" rules={[{ required: true }]}>
                {flowList.map((flows: any, index: number) => (
                  <div key={index}>
                    <div className={`${style.flowNodeWapper} ${index == 0 && style.minWidth}`}>
                      {Array.isArray(flows) && flows.length > 1 ? (
                        flows.map((flow: any) => (
                          <div
                            className={style.node}
                            key={flow.flowId}
                            onClick={() => selectAlloactionTemplateFlowNode(index, flow.flowId)}
                          >
                            <i className={flow.isSelected ? style.checked : style.notchecked}></i>
                            <span>{flow.name || flow.storeName}</span>
                          </div>
                        ))
                      ) : (
                        <div className={style.node}>
                          {/* 如果当前节点只有一个选项,那么默认选中,并且不显示,复选框 */}
                          <span>{flows[0].name || flows[0].storeName}</span>
                        </div>
                      )}
                    </div>
                    {index < flowList.length - 1 && ArrowComponent()}
                  </div>
                ))}
              </Form.Item>

              <Form.List name="deviceList">
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
                          <Form.Item {...field} name={[field.name, 'typeName']} className={style.fieldItem}>
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
