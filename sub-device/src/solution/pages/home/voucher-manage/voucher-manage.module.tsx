import * as React from 'react';
import { RoutesService } from '~/framework/util/routes/routes.service';
import { voucherManageRoutes } from './voucher-manage.routes';

const VoucherManageModule = () => {
  return <React.Fragment>{RoutesService.renderRoutes(voucherManageRoutes)}</React.Fragment>;
};

export default VoucherManageModule;
