import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, initGlobalState } from 'qiankun';
import { appStore } from './appStore';
import { fetchChildAppsConfig, AppProps } from './fetchChildAppsConfig';
import { StorageUtil } from '~/framework/util/storage';
// 注册子应用 运行主项目
async function registerMainApp(callback: (menuInfo: any) => void) {
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
  const routerInfo: any = await fetchChildAppsConfig();
  const res = resolveRouterInfo(routerInfo);
  StorageUtil.setLocalStorage('MENU_LIST', JSON.stringify(res.micInfo));
  console.log(res.micInfo);

  callback(res.menuInfo);
  routerInfo.forEach((element: any) => {
    const { localURL, onLineURL, path, name, children, loader } = element;
    // 根据children去获取子应用响应的路由节点赋值到当前的页面，作用用来生成路由
    apps.push({
      name: name,
      loader,
      entry: isDev ? localURL : onLineURL,
      container: currentId,
      activeRule: `/#${path}`,
      props: { baseFuntion, name, routers: JSON.parse(JSON.stringify(children)), routerBase: `/#${path}` }
    });
    element.defaultMountApp && (defaultMountApp = element.activeRule);
  });
  console.log(apps);

  // 注册当前的子应用，监听部分生命周期
  registerApps(apps);
  // 设定个默认的app

  setDefaultApp(defaultMountApp);
  // 启动微前端
  start({ prefetch: 'all' });
  // 监听第一个启动的微前端app
  listenFirstStartApp();
  // 启用微前端应用间通讯
  // appStore(initGlobalState);
}

// 设置默认进入放入子程序
function setDefaultApp(defaultMountApp: string) {
  setDefaultMountApp(defaultMountApp);
}

// 注册当前的子应用，监听部分生命周期
function registerApps(apps: Array<any>) {
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

function resolveRouterInfo(routerInfo: any[]) {
  const micInfo: any[] = [];
  const menuInfo: any[] = [];
  routerInfo.map((childProject: any) => {
    // const localURL = childProject.localURL;
    // const onLineURL = childProject.onLineURL;
    // const token = childProject.tokenKey;
    // 每一个应用做处理返回响应的微服务子应用信息和菜单信息
    menuInfo.push(...resolveChildProject(childProject, childProject, micInfo, menuInfo));
  });
  return { micInfo, menuInfo };
}

function resolveChildProject(itemChild: any, childProject: any, micInfo: any[], menuInfo: any[]) {
  const itemChildFilterArray: any = [];
  itemChild?.children?.forEach((item: any) => {
    item.path = itemChild.path + '/' + item.path;

    if (item.children) {
      item.children = resolveChildProject(item, childProject, micInfo, menuInfo);
    } else {
      micInfo.push({
        ...item,
        localURL: childProject.localURL,
        onLineURL: childProject.onLineURL,
        tokenKey: childProject.tokenKey,
        name: childProject.name,
        children: undefined
      });
    }
    if (item.title) {
      itemChildFilterArray.push(item);
    }
  });
  return itemChildFilterArray;
}

export default registerMainApp;
