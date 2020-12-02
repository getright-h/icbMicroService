import * as React from 'react';
import style from './position-monitor-right.component.less';
import { usePositionMonitorRightStore } from './position-monitor-right.component.store';
import { IMapComponent, ISelectLoadingComponent } from '~/solution/components/component.module';
import { Select, Space } from 'antd';
import { PositionMonitorContext } from '../position-monitor.component';
import PositionMonitorMapbtnTrackComponent from '../position-monitor-mapbtn-track-component/position-monitor-mapbtn-track.component';
const { Option } = Select;
export const PositionMonitorRightComponent = () => {
  const { reduxState, dispatch } = React.useContext(PositionMonitorContext);
  const { checkedCarData, currentSelectCar } = reduxState;
  return (
    <div className={style.positionMonitorRight}>
      <div>
        <IMapComponent
          {...{
            id: 'mainContainer',
            needDrawRactangle: true,
            locationCarMarkerList: checkedCarData,
            currentSelectCar
          }}
        />
      </div>
      <PositionMonitorMapbtnTrackComponent />
    </div>
  );
};
