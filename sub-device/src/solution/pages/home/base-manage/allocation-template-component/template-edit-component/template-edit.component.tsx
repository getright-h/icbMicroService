import React from 'react';
import style from './template-edit.component.less';
import { useTemplateEditStore } from './template-edit.component.store';
import { Form, Input, Checkbox, Tooltip, PageHeader, Button } from 'antd';
import { QuestionCircleOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import FlowChartComponent from '~/framework/components/flow-chart-component/flow-chart.component';
import { ISelectLoadingComponent } from '~/framework/components/component.module';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { FlowList } from '~/solution/model/dto/allocation-template.dto';
import { useCallback } from 'react';
import WarehouseCascaderComponent from '~/solution/components/warehouse-cascader-component/warehouse-cascader.component';

export default function TemplateEditComponent() {
  const { state, addFlowNode, form, getCurrentSelectInfo, setCascaderInfo } = useTemplateEditStore();
  const { gState } = React.useContext(GlobalContext);
  const { flowNodeSettingField } = state;
  const history = useHistory();
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
  };

  const WarehouseCascaderComponentC = useCallback(
    field =>
      WarehouseCascaderComponent({
        setInfo: (...info) => setCascaderInfo(field, ...info),
        organizationId: field.organizationId
      }),
    []
  );

  const ISelectLoadingComponentX = useCallback(
    () =>
      ISelectLoadingComponent({
        placeholder: '请选择机构',
        showSearch: true,
        // selectedValue: field.organizationName,
        searchForm: {
          systemId: gState.myInfo.systemId
        },
        reqUrl: 'queryStoreOrganization'
        // getCurrentSelectInfo: (...info) => getCurrentSelectInfo(field, ...info)
      }),
    []
  );

  function onFinish(values: any) {
    console.log(values);
  }

  // 基本资料填写
  function BaseInfo() {
    return (
      <div className={style.formPart}>
        <div className={style.subTitle}>
          <h3>1. 基本资料填写</h3>
        </div>
        <div className={style.formItems}>
          <div className={style.formLeft}>
            <Form.Item name="name" label="流程名称" wrapperCol={{ span: 8 }} rules={[{ required: true }]}>
              <Input placeholder="请输入流程名称" />
            </Form.Item>
            <Form.Item name="type" label="流程类型" wrapperCol={{ span: 8 }}>
              <Checkbox defaultChecked disabled>
                仓库间流程
              </Checkbox>
              <Tooltip
                placement="right"
                arrowPointAtCenter={true}
                title="仓库间流程用于各个组织下仓库与仓库之间的设备调拨"
              >
                <QuestionCircleOutlined style={{ color: '#ff4d4f' }} />
              </Tooltip>
            </Form.Item>
          </div>
        </div>
      </div>
    );
  }

  function FlowNodeSetting() {
    return (
      <div className={style.formPart}>
        <div className={style.subTitle}>
          <h3>2. 流程节点设置</h3>
        </div>
        <div className={style.formItems}>
          <div className={style.formLeft}>
            {
              <Form.List name="sights">
                {(fields, { add, remove }) => {
                  return (
                    <>
                      {flowNodeSettingField &&
                        flowNodeSettingField.length &&
                        flowNodeSettingField.map((field: any, index) => {
                          const isChild = index >= 1 && field.sort == flowNodeSettingField[index - 1].sort;
                          return (
                            <Form.Item
                              style={{ marginTop: isChild ? '10px' : '0' }}
                              key={field.name}
                              colon={false}
                              label={isChild ? ' ' : '选择节点: '}
                            >
                              <Form.Item style={{ display: 'inline-block', width: 'calc(40% - 8px)' }}>
                                {ISelectLoadingComponentX()}
                              </Form.Item>

                              <Form.Item
                                name={[field.name, 'storeId']}
                                fieldKey={[field.fieldKey, 'storeId']}
                                rules={[{ type: 'array' }]}
                                style={{ display: 'inline-block', width: 'calc(40% - 8px)', margin: '0px 8px' }}
                              >
                                {WarehouseCascaderComponentC(field)}
                              </Form.Item>
                              <PlusCircleOutlined
                                style={{ marginRight: '10px' }}
                                onClick={() => {
                                  addFlowNode(field.sort, add, index);
                                }}
                              />
                              <MinusCircleOutlined
                                onClick={() => {
                                  remove(field.name);
                                }}
                              />
                            </Form.Item>
                          );
                        })}
                      {AddButton(add)}
                    </>
                  );
                }}
              </Form.List>
            }
            {/* {flowNodeSettingField &&
              flowNodeSettingField.map((field, index) => {
               
                return (
                  
                );
              })} */}
          </div>
          <div className={style.formRight}>
            <FlowChartComponent />
          </div>
        </div>
      </div>
    );
  }

  function AddButton(add: (...item: any) => void) {
    return (
      <div className={style.buttonField}>
        <Button
          type="primary"
          onClick={() => {
            addFlowNode(-1, add);
          }}
        >
          添加节点
        </Button>
      </div>
    );
  }

  return (
    <div className={style.mainForm}>
      <PageHeader className="site-page-header" onBack={() => history.goBack()} title="仓库调拨模板编辑" />
      <Form {...layout} form={form} onFinish={onFinish}>
        <BaseInfo />
        <FlowNodeSetting />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
