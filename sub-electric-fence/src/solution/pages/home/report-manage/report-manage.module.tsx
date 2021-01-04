import React from 'react';
import { RoutesService } from '~/framework/util/routes/routes.service';
import { reportManageRoutes } from './report-manage.routes';

const ReportManageModule = () => {
  return <React.Fragment>{RoutesService.renderRoutes(reportManageRoutes)}</React.Fragment>;
};

export default ReportManageModule;
