import * as React from 'react';
import style from './position-monitor-right.component.less';
import { usePositionMonitorRightStore } from './position-monitor-right.component.store';
import { IMapComponent, ISelectLoadingComponent } from '~/solution/components/component.module';
import { PositionMonitorContext } from '../position-monitor.component';
import PositionMonitorMapbtnTrackComponent from '../position-monitor-mapbtn-track-component/position-monitor-mapbtn-track.component';
import PositionMonitorMapbtnDrivingComponent from '../position-monitor-mapbtn-driving-line-component/position-monitor-mapbtn-driving-line.component';
import DirectivePatchModalComponent from '../../../directive-manage/wiget/directive-patch-model-component/directive-patch-moda.component';
import { IPositionMonitorRightProps } from './position-monitor-right.interface';
import { Button } from 'antd';
import PositionMonitorAreaSearchCarComponent from '../position-monitor-area-search-car-component/position-monitor-area-search-car.component';
export const PositionMonitorRightComponent = (props: IPositionMonitorRightProps) => {
  const { reduxState } = React.useContext(PositionMonitorContext);

  const {
    searchCar,
    state,
    closeMapbtnPage,
    setCurrentSelectCarInfo,
    drawDrivingLine,
    controllerDirectiveModal,
    closeMapDrivingPage,
    closeMapSearchCarbtnPage,
    controllerAreaCarSearchModal
  } = usePositionMonitorRightStore(props);
  const { checkedCarData, currentSelectCar } = reduxState;
  const { mapbtnTrackrVisible, mapbtnDrivingVisible, modalDirectiveVisible, deviceId, mapbtnSearchCarVisible } = state;
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

  const areaSearchCarProps = React.useMemo(
    () => ({
      mapbtnSearchCarVisible,
      closeMapSearchCarbtnPage
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
      {/* <div className={style.areaCarSearch} onClick={controllerAreaCarSearchModal}>
        <Button type="primary" size="small">
          区域查车
        </Button>
      </div> */}
      {mapbtnTrackrVisible && <PositionMonitorMapbtnTrackComponent {...positionMonitorMapbtnTrackProps} />}
      {mapbtnSearchCarVisible && <PositionMonitorAreaSearchCarComponent {...areaSearchCarProps} />}
      {mapbtnDrivingVisible && <PositionMonitorMapbtnDrivingComponent {...positionMonitorMapbtnDrivingProps} />}
    </div>
  );
};
