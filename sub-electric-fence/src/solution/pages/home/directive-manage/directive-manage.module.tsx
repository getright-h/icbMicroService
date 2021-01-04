import React from 'react';
import { RoutesService } from '~/framework/util/routes/routes.service';
import { directiveManageRoutes } from './directive-manage.routes';

const DirectiveManageModule = () => {
  return <React.Fragment>{RoutesService.renderRoutes(directiveManageRoutes)}</React.Fragment>;
};

export default DirectiveManageModule;
