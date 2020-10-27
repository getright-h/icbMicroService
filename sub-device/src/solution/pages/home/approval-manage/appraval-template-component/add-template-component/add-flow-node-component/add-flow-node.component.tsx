import * as React from 'react';
import style from './add-flow-node.component.less';
import { useAddFlowNodeStore } from './add-flow-node.component.store';
import { Form, Button } from 'antd';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { ISelectLoadingComponent } from '~/framework/components/component.module';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { IAddFlowNodeProps } from './add-flow-node.interface';
import { AddTemplateManageContext } from '../add-template.component';
import { FlowList } from '~/solution/model/dto/allocation-template.dto';

export default function AddFlowNodeComponent(props: IAddFlowNodeProps) {
  const { reduxState } = React.useContext(AddTemplateManageContext);
  const { addFlowNode, addFatherFlowNode, getCurrentSelectInfo, removeFlowNode } = useAddFlowNodeStore(props);
  const { gState } = React.useContext(GlobalContext);
  const { canEdit } = props;

  const { flowNodeSettingField } = reduxState;

  const ISelectLoadingComponentX = React.useCallback(
    field =>
      ISelectLoadingComponent({
        placeholder: '机构',
        showSearch: true,
        width: '100px',
        allowClear: false,
        selectedValue: canEdit ? undefined : field.organizationName,
        searchForm: {
          systemId: gState.myInfo.systemId
        },
        disabled: canEdit,
        reqUrl: 'queryStoreOrganization',
        getCurrentSelectInfo: (...info) => getCurrentSelectInfo(field, ...info, 'organization')
      }),
    []
  );
  const ISelectLoadingComponentY = React.useCallback(
    field =>
      ISelectLoadingComponent({
        placeholder: '仓库',
        showSearch: true,
        width: '100px',
        selectedValue: canEdit ? undefined : field.storeName,
        isData: true,
        allowClear: false,
        disabled: canEdit,
        searchForm: {
          organizationId: field.organizationId
        },
        reqUrl: 'queryStoreListByOrganizationId',
        getCurrentSelectInfo: (...info) => getCurrentSelectInfo(field, ...info, 'store')
      }),
    []
  );
  const ISelectLoadingComponentZ = React.useCallback(
    field =>
      ISelectLoadingComponent({
        placeholder: '仓位',
        showSearch: true,
        allowClear: false,
        width: '100px',
        disabled: canEdit,
        selectedValue: canEdit ? undefined : field.storePositionName,
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
                      {field.attributeList.map((item: FlowList, indexItem: number) => {
                        return (
                          <div style={{ display: 'flex' }} key={item.childNodeId}>
                            <Form.Item style={{ display: 'inline-block', width: '100px' }}>
                              {ISelectLoadingComponentX(item)}
                            </Form.Item>

                            <Form.Item style={{ display: 'inline-block', width: '100px' }}>
                              {ISelectLoadingComponentY(item)}
                            </Form.Item>
                            <Form.Item style={{ display: 'inline-block', width: '100px' }}>
                              {ISelectLoadingComponentZ(item)}
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
