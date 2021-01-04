import * as React from 'react';
import { RoutesService } from '~/framework/util/routes/routes.service';
import { electricFenceManageRoutes } from './electric-fence-manage.routes';

const ElectricFenceManageModule = () => {
  return <React.Fragment>{RoutesService.renderRoutes(electricFenceManageRoutes)}</React.Fragment>;
};

export default ElectricFenceManageModule;
