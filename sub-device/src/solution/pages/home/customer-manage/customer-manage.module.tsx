import * as React from 'react';
import { RoutesService } from '~/framework/util/routes/routes.service';
import { customerManageRoutes } from './customer-manage.routes';

const CustomerManageModule = () => {
  return <React.Fragment>{RoutesService.renderRoutes(customerManageRoutes)}</React.Fragment>;
};

export default CustomerManageModule;
