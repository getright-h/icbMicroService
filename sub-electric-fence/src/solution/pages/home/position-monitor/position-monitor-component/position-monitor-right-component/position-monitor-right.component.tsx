import * as React from 'react';
import style from './position-monitor-right.component.less';
import { usePositionMonitorRightStore } from './position-monitor-right.component.store';
import { IMapComponent, ISelectLoadingComponent } from '~/solution/components/component.module';
import { Select, Space } from 'antd';
import PositionMonitorDrawerRightComponent from '../position-monitor-drawer-right-component/position-monitor-drawer-right.component';
import { PositionMonitorContext } from '../position-monitor.component';
const { Option } = Select;
export default function PositionMonitorRightComponent() {
  const { reduxState, dispatch } = React.useContext(PositionMonitorContext);
  const { checkedCarData, currentSelectCar } = reduxState;
  return (
    <div className={style.positionMonitorRight}>
      <div>{IMapComponent({ locationCarMarkerList: checkedCarData, currentSelectCar })}</div>
      {PositionMonitorDrawerRightComponent()}
    </div>
  );
}
