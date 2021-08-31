import * as React from 'react';
import { RoutesService } from '~/framework/util/routes/routes.service';
import { publicRoutes } from './public.routes';

const PublicModule = () => {
  return <React.Fragment>{RoutesService.renderRoutes(publicRoutes)}</React.Fragment>;
};

export default PublicModule
