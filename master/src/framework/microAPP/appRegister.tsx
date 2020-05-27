import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, initGlobalState } from 'qiankun';
import { appStore } from './appStore';
import { fetchChildAppsConfig, AppProps, AppConfig } from './fetchChildAppsConfig';
import { StorageUtil } from '~/framework/util/storage';
// 注册子应用 运行主项目
function registerMainApp() {
  const isDev = process.env.NODE_ENV === 'development';
  const currentId = '#subapp-viewport';
  const apps: Array<AppProps> = [];
  let defaultMountApp = '';
  const baseFuntion = {
    logout: () => {
      StorageUtil.removeLocalStorage('TOKEN');
      location.href = '/login';
    }
  };
  //获取当前子项目的相关信息
  fetchChildAppsConfig().then((res: Array<AppConfig>) => {
    res.forEach(element => {
      const { devEntry, proEntry, activeRule, name, children } = element;
      // 根据children去获取子应用响应的路由节点赋值到当前的页面，作用用来生成路由
      apps.push({
        name: name,
        entry: isDev ? devEntry : proEntry,
        container: currentId,
        activeRule: activeRule,
        props: { baseFuntion, name: element.name, routers: children, routerBase: activeRule }
      });
      element.defaultMountApp && (defaultMountApp = element.activeRule);
    });
    // 注册当前的子应用，监听部分生命周期
    registerApps(apps);
    // 设定个默认的app
    // setDefaultApp(defaultMountApp);
    // 启动微前端
    start();
    // 监听第一个启动的微前端app
    listenFirstStartApp();
    // 启用微前端应用间通讯
    appStore(initGlobalState);
  });
}

// 设置默认进入放入子程序
function setDefaultApp(defaultMountApp: string) {
  setDefaultMountApp(defaultMountApp);
}

// 注册当前的子应用，监听部分生命周期
function registerApps(apps: Array<AppProps>) {
  registerMicroApps(apps, {
    beforeLoad: [
      ((app: AppProps) => {
        console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
      }) as any
    ],
    beforeMount: [
      ((app: AppProps) => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
      }) as any
    ],
    afterUnmount: [
      ((app: AppProps) => {
        console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
      }) as any
    ]
  });
}

// 监听第一个启动的微前端app
function listenFirstStartApp() {
  runAfterFirstMounted(() => {
    console.log('[MainApp] first app mounted');
  });
}

export default registerMainApp;
