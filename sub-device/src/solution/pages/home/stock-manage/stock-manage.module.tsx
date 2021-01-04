import React from 'react';
import { RoutesService } from '~/framework/util/routes/routes.service';
import { stockManageRoutes } from './stock-manage.routes';

const StockManageModule = () => {
  return <React.Fragment>{RoutesService.renderRoutes(stockManageRoutes)}</React.Fragment>;
};

export default StockManageModule;
