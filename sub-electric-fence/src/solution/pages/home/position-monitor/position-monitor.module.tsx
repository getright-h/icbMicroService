import React from 'react';
import { RoutesService } from '~/framework/util/routes/routes.service';
import { positionMonitorRoutes } from './position-monitor.routes';

const PositionMonitorModule = () => {
  return <React.Fragment>{RoutesService.renderRoutes(positionMonitorRoutes)}</React.Fragment>;
};

export default PositionMonitorModule;
