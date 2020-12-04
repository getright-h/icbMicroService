import * as React from 'react';
import style from './position-monitor-mapbtn-track.component.less';
import { usePositionMonitorMapbtnTrackStore } from './position-monitor-mapbtn-track.component.store';
import { Drawer } from 'antd';
import { IMapComponent } from '~/solution/components/component.module';
import { IPositionMonitorMapbtnTrackProps } from './position-monitor-mapbtn-track.interface';

export default React.memo((props: IPositionMonitorMapbtnTrackProps) => {
  const { state } = usePositionMonitorMapbtnTrackStore();
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

  function Title() {
    return (
      <div>
        追踪
        <span>{state.refreshTime}</span>
      </div>
    );
  }
  return (
    <Drawer
      title={<Title />}
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
