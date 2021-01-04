import React from 'react';
import { RoutesService } from '~/framework/util/routes/routes.service';
import { alarmManageRoutes } from './alarm-manage.routes';

const AlarmManageModule = () => {
  return <React.Fragment>{RoutesService.renderRoutes(alarmManageRoutes)}</React.Fragment>;
};

export default AlarmManageModule;
