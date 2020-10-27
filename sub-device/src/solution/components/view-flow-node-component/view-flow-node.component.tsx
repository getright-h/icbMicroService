import { Form, Select } from 'antd';
import * as React from 'react';
import style from './view-flow-node.component.less';
import { useViewFlowNodeStore } from './view-flow-node.component.store';
import { ViewFlowNodeComponentProps } from './view-flow-node.interface';
import FlowChartComponent from '~/framework/components/flow-chart-component/flow-chart.component';
import { FlowList } from '~/solution/model/dto/allocation-template.dto';

export default function ViewFlowNodeComponent(props: ViewFlowNodeComponentProps) {
  const { state } = useViewFlowNodeStore();
  const { flowNodeSettingField, canEdit } = props;
  function FlowNodeSettingFieldView() {
    return (
      flowNodeSettingField &&
      flowNodeSettingField.map((field, index) => {
        return (
          <div className={style.flowNodeSettingField} key={field.flowNodeSettingFieldId}>
            <span>{`选择节点${index}: `}</span>
            {field.attributeList.map((item: FlowList, indexItem: number) => {
              return (
                <>
                  <div>
                    <Select
                      style={{ width: '110px' }}
                      disabled
                      value={canEdit ? undefined : item.organizationName}
                      placeholder={'机构'}
                    />
                  </div>
                  <div>
                    <Select
                      style={{ width: '110px' }}
                      value={canEdit ? undefined : item.storeName}
                      disabled
                      placeholder={'仓库'}
                    />
                  </div>
                  <div>
                    <Select
                      style={{ width: '110px' }}
                      disabled
                      value={canEdit ? undefined : item.storePositionName}
                      placeholder={'仓位'}
                    />
                  </div>
                </>
              );
            })}
          </div>
        );
      })
    );
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: 1 }}>{FlowNodeSettingFieldView()}</div>
      <div style={{ flex: 1 }}>
        <FlowChartComponent canEdit={canEdit} flowNodeSettingField={flowNodeSettingField} />
      </div>
    </div>
  );
}
