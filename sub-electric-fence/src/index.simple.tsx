import '~framework/bootstrap';

import { renderApp } from './framework/microAPP/appRegister';
import { appSimpleRoutes } from './solution/pages/app.simple';

renderApp(undefined, appSimpleRoutes);
