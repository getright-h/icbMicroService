import React from 'react';
import style from './position-monitor-right.component.less';
import { usePositionMonitorRightStore } from './position-monitor-right.component.store';
import { IMapComponent, ISelectLoadingComponent } from '~/solution/components/component.module';
import { PositionMonitorContext } from '../position-monitor.component';
import PositionMonitorMapbtnTrackComponent from '../position-monitor-mapbtn-track-component/position-monitor-mapbtn-track.component';
import PositionMonitorMapbtnDrivingComponent from '../position-monitor-mapbtn-driving-line-component/position-monitor-mapbtn-driving-line.component';
import DirectivePatchModalComponent from '../../../directive-manage/wiget/directive-patch-model-component/directive-patch-moda.component';
export const PositionMonitorRightComponent = () => {
  const { reduxState } = React.useContext(PositionMonitorContext);

  const {
    searchCar,
    state,
    closeMapbtnPage,
    setCurrentSelectCarInfo,
    drawDrivingLine,
    controllerDirectiveModal,
    closeMapDrivingPage
  } = usePositionMonitorRightStore();
  const { checkedCarData, currentSelectCar } = reduxState;
  const { mapbtnTrackrVisible, mapbtnDrivingVisible, modalDirectiveVisible, deviceId } = state;
  const mapProps = React.useMemo(
    () => ({
      id: 'mainContainer',
      needDrawRactangle: true,
      locationCarMarkerList: checkedCarData,
      currentSelectCar,
      drawDrivingLine,
      controllerDirectiveModal,
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

  const ISelectCarLoadingComponent = ISelectLoadingComponent({
    placeholder: '车主姓名/手机/车牌号',
    showSearch: true,
    width: '200px',
    searchKeyName: 'strValue',
    reqUrl: 'queryVehicleInfoPagedList',
    getCurrentSelectInfo: (value: any, option: any) => setCurrentSelectCarInfo(option?.info)
  });
  return (
    <div className={style.positionMonitorRight}>
      <div>
        <IMapComponent {...mapProps} />
        <div className={`${style.info} ${style.searchCar}`}>{ISelectCarLoadingComponent}</div>
      </div>
      {modalDirectiveVisible && (
        <DirectivePatchModalComponent
          visible={modalDirectiveVisible}
          close={() => controllerDirectiveModal(false)}
          deviceId={deviceId}
        />
      )}
      {mapbtnTrackrVisible && <PositionMonitorMapbtnTrackComponent {...positionMonitorMapbtnTrackProps} />}
      <PositionMonitorMapbtnDrivingComponent {...positionMonitorMapbtnDrivingProps} />
    </div>
  );
};
