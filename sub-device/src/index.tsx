// import '~framework/bootstrap';
import childProjectLifeCycle, { renderApp } from './framework/microAPP/appRegister';
import { createStore } from './framework/myRedux/myRedux';
import { MicFEReducer } from './framework/myRedux/doRedux';
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
// 导出子应用的生命周期
const { mount, bootstrap, unmount } = childProjectLifeCycle();
export { mount, bootstrap, unmount };
const store = createStore(MicFEReducer);
window.$store = store;
console.log('window.__POWERED_BY_QIANKUN__', window.__POWERED_BY_QIANKUN__);

// 注册并启动微前端
window.__POWERED_BY_QIANKUN__ || renderApp();
