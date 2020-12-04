import * as React from 'react';
import style from './position-monitor-right.component.less';
import { usePositionMonitorRightStore } from './position-monitor-right.component.store';
import { IMapComponent, ISelectLoadingComponent } from '~/solution/components/component.module';
import { Select, Space } from 'antd';
import { PositionMonitorContext } from '../position-monitor.component';
import PositionMonitorMapbtnTrackComponent from '../position-monitor-mapbtn-track-component/position-monitor-mapbtn-track.component';
import PositionMonitorMapbtnDrivingComponent from '../position-monitor-mapbtn-driving-line-component/position-monitor-mapbtn-driving-line.component';
const { Option } = Select;
export const PositionMonitorRightComponent = () => {
  const { searchCar, state, closeMapbtnPage, drawDrivingLine, closeMapDrivingPage } = usePositionMonitorRightStore();
  const { reduxState, dispatch } = React.useContext(PositionMonitorContext);
  const { checkedCarData, currentSelectCar } = reduxState;
  const { mapbtnTrackrVisible, mapbtnDrivingVisible } = state;
  const mapProps = React.useMemo(
    () => ({
      id: 'mainContainer',
      needDrawRactangle: true,
      locationCarMarkerList: checkedCarData,
      currentSelectCar,
      drawDrivingLine,
      onMapTrack: searchCar
    }),
    [checkedCarData, currentSelectCar]
  );

  const positionMonitorMapbtnTrackProps = React.useMemo(
    () => ({
      mapbtnTrackrVisible,
      closeMapbtnPage
    }),
    [mapbtnTrackrVisible]
  );
  const positionMonitorMapbtnDrivingProps = React.useMemo(
    () => ({
      mapbtnDrivingVisible,
      closeMapDrivingPage
    }),
    [mapbtnDrivingVisible]
  );
  return (
    <div className={style.positionMonitorRight}>
      <div>
        <IMapComponent {...mapProps} />
      </div>
      {mapbtnTrackrVisible && <PositionMonitorMapbtnTrackComponent {...positionMonitorMapbtnTrackProps} />}
      <PositionMonitorMapbtnDrivingComponent {...positionMonitorMapbtnDrivingProps} />
    </div>
  );
};
