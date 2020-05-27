import '~framework/bootstrap';
import * as React from 'react';
import { render } from 'react-dom';
import App from './solution/pages/app.component';
import registerMainApp from './framework/microAPP/appRegister';

render(<App />, document.getElementById('root'));

// 注册并启动微前端
registerMainApp();
