import * as React from 'react';
import { RoutesService } from '~/framework/util/routes/routes.service';
import { positionMonitorRoutes } from './position-monitor.routes';

const PositionMonitorModule = () => {
  console.log(1);

  return <React.Fragment>{RoutesService.renderRoutes(positionMonitorRoutes)}</React.Fragment>;
};

export default PositionMonitorModule;
