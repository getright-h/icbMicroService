import * as React from 'react';
import { RoutesService } from '~/framework/util/routes/routes.service';
import { monitorManageRoutes } from './monitor-manage.routes';

const MonitorManageModule = () => {
  return <React.Fragment>{RoutesService.renderRoutes(monitorManageRoutes)}</React.Fragment>;
};

export default MonitorManageModule;
