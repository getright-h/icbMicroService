import * as React from 'react';
import style from './fence-map.component.less';
import { useFenceMapStore } from './fence-map.component.store';
import { IFenceMapProps } from './fence-map.interface';

const FenceMapComponent = React.memo((props: IFenceMapProps) => {
  const { state } = useFenceMapStore(props);
  return <div id="container" className={style.container}></div>;
});

export default FenceMapComponent;
