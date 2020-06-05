export function fetchChildAppsConfig() {
  return new Promise(resolve => {
    resolve([
      {
        name: 'test',
        devEntry: '//localhost:8081',
        proEntry: '',
        activeRule: '/#/home',
        title: '测试菜单',
        icon: 'anticon-mobile',
        defaultMountApp: true,
        // singular: true,
        children: [
          {
            path: '',
            title: '登录测试',
            icon: 'anticon-mobile',
            lazyload: true,
            exact: true,
            componentUrl: 'login'
          },
          {
            path: 'home',
            title: '登录测试2',
            icon: 'anticon-mobile',
            lazyload: true,
            exact: true,
            componentUrl: 'home'
          }
        ]
      }
    ]);
  });
}

export interface AppConfig {
  name: string;
  props: any;
  devEntry: string;
  proEntry: string;
  activeRule: string;
  singular?: boolean;
  defaultMountApp: boolean;
  children?: Array<ChildrenObject>;
}

export interface ChildrenObject {
  path: string;
  title: string;
  icon: string;
  lazyload: boolean;
  exact: boolean;
  componentUrl: string;
}

export interface AppProps {
  name: string;
  props: any;
  singular?: boolean;
  entry: string;
  container: string;
  activeRule: string;
  children?: Array<ChildrenObject>;
}
