import * as React from 'react';
import { RoutesService } from '~/framework/util/routes/routes.service';
import { allocationManageRoutes } from './allocation-manage.routes';

const AllocationManageModule = () => {
  return <React.Fragment>{RoutesService.renderRoutes(allocationManageRoutes)}</React.Fragment>;
};

export default AllocationManageModule;
