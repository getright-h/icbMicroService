import * as React from 'react';
import style from './flow-node.component.less';
import { useFlowNodeStore } from './flow-node.component.store';
import { FlowList } from '~/solution/model/dto/allocation-template.dto';
import { IFlowNodeProps } from './flow-node.interface';
import { Checkbox, Select } from 'antd';
import FlowChartComponent from '~/framework/components/flow-chart-component/flow-chart.component';
import { ISelectLoadingComponent } from '~/framework/components/component.module';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { checked } from '~/solution/pages/home/allocation-manage/allocation-manage-component/allocation-detail-component/allocation-detail.component.less';

export default function FlowNodeComponent(props: IFlowNodeProps) {
  const { state, getCurrentSelectInfo, onChangeCheckedInfo } = useFlowNodeStore(props);
  const { flowNodeSettingField } = props;
  const { gState } = React.useContext(GlobalContext);
  const ISelectLoadingComponentX = React.useCallback(
    (field, isEdit) =>
      ISelectLoadingComponent({
        placeholder: '机构',
        showSearch: true,
        width: '100px',
        allowClear: false,
        selectedValue: field?.organizationName,
        searchForm: {
          systemId: gState.myInfo.systemId
        },
        disabled: !isEdit,
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
        selectedValue: field?.storeName,
        isData: true,
        allowClear: false,
        disabled: !isEdit,
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
        disabled: !isEdit,
        selectedValue: field?.storePositionName,
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

  function FlowNodeSettingFieldView() {
    return (
      flowNodeSettingField &&
      flowNodeSettingField.map((field, index) => {
        return (
          <div className={style.flowNodeSettingField} key={field.id}>
            <span>{`选择节点${index + 1}: `}</span>
            <div>
              {field.attributeList &&
                field.attributeList.map((item: FlowList, index) => {
                  return (
                    <div key={item.flowId + index} style={{ display: 'flex', alignItems: 'center' }}>
                      <div className={style.chooseInfo}>{ISelectLoadingComponentX(item, field.isEdit)}</div>
                      <div className={style.chooseInfo}>{ISelectLoadingComponentY(item, field.isEdit)}</div>
                      <div className={style.chooseInfo}>{ISelectLoadingComponentZ(item, field.isEdit)}</div>
                      {
                        <Checkbox
                          checked={item.isSelected}
                          onChange={$event => onChangeCheckedInfo(item, $event.target.checked)}
                        ></Checkbox>
                      }
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })
    );
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: 1 }}>{FlowNodeSettingFieldView()}</div>
      <div style={{ flex: 1 }}>
        <FlowChartComponent hasChecked flowNodeSettingField={flowNodeSettingField} />
      </div>
    </div>
  );
}
