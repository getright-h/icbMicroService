import * as React from 'react';
import { RoutesService } from '~/framework/util/routes/routes.service';
import { baseManageRoutes } from './base-manage.routes';

const BaseManageModule = () => {
  return <React.Fragment>{RoutesService.renderRoutes(baseManageRoutes)}</React.Fragment>;
};

export default BaseManageModule;
