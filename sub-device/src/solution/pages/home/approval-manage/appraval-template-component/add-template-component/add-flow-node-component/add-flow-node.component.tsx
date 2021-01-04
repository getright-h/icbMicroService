import React from 'react';
import style from './add-flow-node.component.less';
import { useAddFlowNodeStore } from './add-flow-node.component.store';
import { Form, Button, Switch } from 'antd';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { ISelectLoadingComponent } from '~/framework/components/component.module';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { IAddFlowNodeProps } from './add-flow-node.interface';
import { AddTemplateManageContext } from '../add-template.component';
import { AllotNodeFlowInput, FlowList } from '~/solution/model/dto/allocation-template.dto';

export default function AddFlowNodeComponent(props: IAddFlowNodeProps) {
  const { reduxState } = React.useContext(AddTemplateManageContext);
  const {
    addFlowNode,
    addFatherFlowNode,
    getCurrentSelectInfo,
    onChangeCustomInfo,
    removeFlowNode
  } = useAddFlowNodeStore(props);
  const { gState } = React.useContext(GlobalContext);

  const { flowNodeSettingField } = reduxState;

  function IsCanEdit(field: AllotNodeFlowInput | any) {
    return (
      <div>
        <Form.Item label="当前节点是否可编辑" rules={[{ required: true }]}>
          <Switch checked={field.isEdit} onChange={value => onChangeCustomInfo<boolean>(field, 'isEdit', value)} />
        </Form.Item>
      </div>
    );
  }

  const ISelectLoadingComponentX = React.useCallback(
    (field, isEdit) =>
      ISelectLoadingComponent({
        placeholder: '机构',
        showSearch: true,
        width: '100px',
        allowClear: false,
        selectedValue: isEdit ? undefined : field.organizationName,
        searchForm: {
          systemId: gState.myInfo.systemId
        },
        disabled: isEdit,
        reqUrl: 'queryStoreOrganization',
        getCurrentSelectInfo: (...info) => getCurrentSelectInfo(field, ...info, 'organization')
      }),
    []
  );
  const ISelectLoadingComponentY = React.useCallback(
    (field, isEdit) =>
      ISelectLoadingComponent({
        placeholder: '仓库',
        showSearch: true,
        width: '100px',
        selectedValue: isEdit ? undefined : field.storeName,
        isData: true,
        allowClear: false,
        disabled: isEdit,
        searchForm: {
          organizationId: field.organizationId
        },
        reqUrl: 'queryStoreListByOrganizationId',
        getCurrentSelectInfo: (...info) => getCurrentSelectInfo(field, ...info, 'store')
      }),
    []
  );
  const ISelectLoadingComponentZ = React.useCallback(
    (field, isEdit) =>
      ISelectLoadingComponent({
        placeholder: '仓位',
        showSearch: true,
        allowClear: false,
        width: '100px',
        disabled: isEdit,
        selectedValue: isEdit ? undefined : field.storePositionName,
        searchForm: {
          storeId: field.storeId,
          name: '',
          beginTime: -1,
          endTime: -1
        },
        reqUrl: 'queryStorePositionList',
        getCurrentSelectInfo: (...info) => getCurrentSelectInfo(field, ...info, 'storePosition')
      }),
    []
  );

  function AddButton() {
    return (
      <div className={style.buttonField}>
        <Button
          type="primary"
          onClick={() => {
            addFatherFlowNode();
          }}
        >
          添加节点
        </Button>
      </div>
    );
  }

  function FlowNodeSetting() {
    return (
      <div className={style.formPart}>
        <div className={style.formItems}>
          <div className={style.formLeft}>
            <>
              {flowNodeSettingField &&
                flowNodeSettingField.map((field: any, index: number) => {
                  return (
                    <div key={field.flowNodeSettingFieldId}>
                      <span>{`选择节点${index + 1}: `}</span>
                      {field.attributeList &&
                        field.attributeList.map((item: FlowList, indexItem: number) => {
                          return (
                            <div style={{ display: 'flex' }} key={item.childNodeId}>
                              <Form.Item style={{ display: 'inline-block', width: '100px' }}>
                                {ISelectLoadingComponentX(item, field.isEdit)}
                              </Form.Item>

                              <Form.Item style={{ display: 'inline-block', width: '100px' }}>
                                {ISelectLoadingComponentY(item, field.isEdit)}
                              </Form.Item>
                              <Form.Item style={{ display: 'inline-block', width: '100px' }}>
                                {ISelectLoadingComponentZ(item, field.isEdit)}
                              </Form.Item>
                              <PlusCircleOutlined
                                style={{ margin: '0 3px', lineHeight: '32px' }}
                                onClick={() => {
                                  addFlowNode(field);
                                }}
                              />
                              <MinusCircleOutlined
                                style={{ lineHeight: '32px' }}
                                onClick={() => {
                                  removeFlowNode(field, indexItem);
                                }}
                              />
                            </div>
                          );
                        })}
                      {IsCanEdit(field)}
                    </div>
                  );
                })}
              {AddButton()}
            </>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <FlowNodeSetting />
    </div>
  );
}
