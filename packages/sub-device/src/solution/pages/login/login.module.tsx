import * as React from 'react';
import { RoutesService } from '~/framework/util/routes/routes.service';
import { loginRoutes } from './login.routes';
import { Redirect } from 'react-router-dom';

const LoginModule = () => {
  return (
    <React.Fragment>
      {RoutesService.renderRoutes(loginRoutes, false, <Redirect from="/" exact to="/login" key="redirect"></Redirect>)}
    </React.Fragment>
  );
};

export default LoginModule;
