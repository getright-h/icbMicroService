import * as React from 'react';
import style from './flow-chart.component.less';
import { useFlowChartStore } from './flow-chart.component.store';
import { Divider } from 'antd';
import { FlowChartComponentProps } from './flow-chart.interface';
import { FlowList } from '~/solution/model/dto/allocation-template.dto';

export default function FlowChartComponent(props: FlowChartComponentProps) {
  const { state } = useFlowChartStore(props);
  const { flowNodeSettingField } = props;

  // 当有单个子元素的时候
  function renderSinglePlace(title: FlowList[], indexF: number, canEdit: boolean) {
    return (
      <>
        <div className={style.box1}>
          {title[0].storePositionName && !canEdit
            ? `${title[0].storeName} - ${title[0].storePositionName}`
            : `节点${indexF}`}
        </div>
      </>
    );
  }

  // 当有多个子元素的时候
  function renderMutiplePlace(title: FlowList[], indexF: number, canEdit: boolean) {
    return (
      <div className={style.box0}>
        {title.map((item, index) => {
          return (
            <div key={item.flowNodeSettingFieldId} className={style.box2}>
              {item.storePositionName && !canEdit
                ? `${item.storeName} - ${title[0].storePositionName}`
                : `节点${indexF}`}
            </div>
          );
        })}
      </div>
    );
  }

  // 连接 的箭头
  function renderAline() {
    return (
      <div>
        <Divider type="vertical" style={{ height: '50px' }} plain></Divider>
        <div className={style.arrowhead}></div>
      </div>
    );
  }
  return (
    <div className={style.boxContent}>
      {flowNodeSettingField &&
        flowNodeSettingField.map((item, index: number) => {
          let returnInfo = null;
          if (item.attributeList.length == 1) {
            returnInfo = renderSinglePlace(item.attributeList, index + 1, item.isEdit);
          } else {
            returnInfo = renderMutiplePlace(item.attributeList, index + 1, item.isEdit);
          }
          if (index + 1 < flowNodeSettingField.length) {
            returnInfo = (
              <>
                {returnInfo}
                {renderAline()}
              </>
            );
          }
          return returnInfo;
        })}
    </div>
  );
}
