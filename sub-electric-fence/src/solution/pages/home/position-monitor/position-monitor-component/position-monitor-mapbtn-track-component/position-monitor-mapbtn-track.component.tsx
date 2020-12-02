import * as React from 'react';
import style from './position-monitor-mapbtn-track.component.less';
import { usePositionMonitorMapbtnTrackStore } from './position-monitor-mapbtn-track.component.store';
import { Drawer } from 'antd';
import { IMapComponent } from '~/solution/components/component.module';

export default function PositionMonitorMapbtnTrackComponent() {
  const { state } = usePositionMonitorMapbtnTrackStore();
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
      // onClose={() => setDataAction({ rightDrawervisible: false }, dispatch)}
      visible={true}
      getContainer={false}
      width={'100vw'}
      height={'100vh'}
    >
      {DrawerContent()}
    </Drawer>
  );
}
