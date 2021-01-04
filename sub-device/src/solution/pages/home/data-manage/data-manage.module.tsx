import React from 'react';
import { RoutesService } from '~/framework/util/routes/routes.service';
import { dataManageRoutes } from './data-manage.routes';

const DataManageModule = () => {
  return <React.Fragment>{RoutesService.renderRoutes(dataManageRoutes)}</React.Fragment>;
};

export default DataManageModule;
