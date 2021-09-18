import * as React from 'react';
import style from './create-allocation.component.less';
import { useCreateAllocationStore } from './create-allocation.component.store';
import { Form, Input, Space, Button, InputNumber } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { GlobalContext } from '~/solution/context/global/global.provider';
import WarehouseCascaderComponent from '~/solution/components/warehouse-cascader-component/warehouse-cascader.component';
import { ISelectLoadingComponent } from '~framework/components/component.module';
import { IHeaderTitleComponent } from 'fch-shop-component-micweb';
export default function CreateAllocationComponent() {
  const {
    state,
    form,
    onChange,
    createNewAllocation,
    removeTypeDevice,
    updateTypeDevice,
    addNode,
    selectAlloactionTemplateFlowNode,
    addFlowNode,
    removeFlowNode,
    setCascaderInfo,
    getCurrentSelectInfo
  } = useCreateAllocationStore();
  const { searchForm = {}, submitLoading, NodeList = [] } = state;
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
  };
  console.log(NodeList);
  const { gState } = React.useContext(GlobalContext);
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
      <div className={style.createAllot}>
        <div className={style.left}>
          {NodeList.length > 0 &&
            NodeList.map((node: any, index: number) => (
              <Form key={index} initialValues={{ sights: [{}] }}>
                <Form.Item label={'流程节点'}>
                  {Array.isArray(node) &&
                    node.map((field: any, number: number) => (
                      <Space key={field.name} style={{ alignItems: 'flex-start', marginRight: 30 }}>
                        <Form.Item>
                          <ISelectLoadingComponent
                            placeholder={'请选择机构'}
                            showSearch={true}
                            searchForm={{ systemId: gState.myInfo.systemId }}
                            reqUrl={'queryStoreOrganization'}
                            getCurrentSelectInfo={(info: any, option: any) =>
                              getCurrentSelectInfo(option, 'organizationId', index, number)
                            }
                          />
                        </Form.Item>

                        <Form.Item
                          name={[field.name, 'storeId']}
                          fieldKey={[field.fieldKey, 'storeId']}
                          rules={[{ type: 'array' }]}
                          style={{ display: 'inline-block', margin: '0px 8px' }}
                        >
                          <WarehouseCascaderComponent
                            setInfo={(value: any, selectedOptions: any) =>
                              setCascaderInfo(selectedOptions, 'selectedOptions', index, number)
                            }
                            organizationId={field.organizationId}
                          />
                        </Form.Item>
                        <PlusOutlined
                          style={{ marginRight: '10px' }}
                          onClick={() => {
                            addFlowNode(index, number);
                          }}
                        />
                        <MinusOutlined
                          onClick={() => {
                            removeFlowNode(index, number);
                          }}
                        />
                      </Space>
                    ))}
                </Form.Item>
              </Form>
            ))}

          <Button onClick={() => addNode()}>添加节点</Button>
        </div>
        <div className={style.right}>
          <Form>
            <Form.Item name="name" rules={[{ required: true }]}>
              {Array.isArray(NodeList) &&
                NodeList.map((flows: any, index: number) => (
                  <div key={index}>
                    <div className={`${style.flowNodeWapper} ${index == 0 && style.minWidth}`}>
                      {Array.isArray(flows) && flows.length > 1 ? (
                        flows.map((flow: any) => (
                          <div
                            className={style.node}
                            key={flow.flowId}
                            onClick={() => selectAlloactionTemplateFlowNode(index, flow.flowId)}
                          >
                            {/* <i className={flow.isSelected ? style.checked : style.notchecked}></i> */}
                            <span>{flow.warehouse && flow.warehouse}</span>
                          </div>
                        ))
                      ) : (
                        <div className={style.node}>
                          <span>{flows[0].warehouse && flows[0].warehouse}</span>
                        </div>
                      )}
                    </div>
                    {index < NodeList.length - 1 && ArrowComponent()}
                  </div>
                ))}
            </Form.Item>
          </Form>
        </div>
      </div>
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
              {/* <Form.Item name="name" label="流程节点（勾选多选项）" rules={[{ required: true }]}>
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
                        
                          <span>{flows[0].name || flows[0].storeName}</span>
                        </div>
                      )}
                    </div>
                    {index < flowList.length - 1 && ArrowComponent()}
                  </div>
                ))}
              </Form.Item> */}

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
