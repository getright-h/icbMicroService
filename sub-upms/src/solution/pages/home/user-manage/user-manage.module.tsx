import React from 'react';
import { RoutesService } from '~/framework/util/routes/routes.service';
import { userManageRoutes } from './user-manage.routes';

const UserManageModule = () => {
  return <React.Fragment>{RoutesService.renderRoutes(userManageRoutes)}</React.Fragment>;
};

export default UserManageModule;
