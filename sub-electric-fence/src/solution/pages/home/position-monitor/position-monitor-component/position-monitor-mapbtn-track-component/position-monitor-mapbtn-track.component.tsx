import React from 'react';
import style from './position-monitor-mapbtn-track.component.less';
import { usePositionMonitorMapbtnTrackStore } from './position-monitor-mapbtn-track.component.store';
import { Drawer } from 'antd';
import { IMapComponent } from '~/solution/components/component.module';
import { IPositionMonitorMapbtnTrackProps } from './position-monitor-mapbtn-track.interface';
import PositionMonitorRefreshHeaderComponent from '../position-monitor-refresh-header-component/position-monitor-refresh-header.component';
export default React.memo((props: IPositionMonitorMapbtnTrackProps) => {
  const { state, refreshContentInfo } = usePositionMonitorMapbtnTrackStore();
  const { mapbtnTrackrVisible, closeMapbtnPage } = props;
  function DrawerContent() {
    const props = {
      id: 'trackContainer',
      needSearchAddress: false,
      needISelectCarLoadingComponent: false,
      height: '93vh',
      carLine: state.carLine
    };
    return (
      <div className={style.mapContent}>
        <IMapComponent {...props} />
      </div>
    );
  }
  return (
    <Drawer
      title={
        <PositionMonitorRefreshHeaderComponent
          refreshContentInfo={refreshContentInfo}
          sentTime={5}
          customStyle={{ padding: 0, marginRight: '40px', border: 0 }}
        />
      }
      placement="bottom"
      mask={false}
      closable
      onClose={closeMapbtnPage}
      visible={mapbtnTrackrVisible}
      getContainer={false}
      width={'100vw'}
      height={'100vh'}
    >
      {DrawerContent()}
    </Drawer>
  );
});
