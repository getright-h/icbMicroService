// import '~framework/bootstrap';
import childProjectLifeCycle, { renderApp } from './framework/microAPP/appRegister';
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
// 导出子应用的生命周期
const { mount, bootstrap, unmount } = childProjectLifeCycle();
export { mount, bootstrap, unmount };
console.log(window.__POWERED_BY_QIANKUN__);

// 注册并启动微前端
window.__POWERED_BY_QIANKUN__ || renderApp();
