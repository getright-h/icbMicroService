import * as React from 'react';
import { RoutesService } from '~/framework/util/routes/routes.service';
import { approvalManageRoutes } from './approval-manage.routes';

const ApprovalManageModule = () => {
  return <React.Fragment>{RoutesService.renderRoutes(approvalManageRoutes)}</React.Fragment>;
};

export default ApprovalManageModule;
