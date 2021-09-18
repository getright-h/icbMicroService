export interface AppConfig {
    // 包含以系列方法来自父应用
    baseFuntion: any;
    name: string;
    routers: Array<ChildrenObject>;
    routerBase: string,
    elementInfo: string,
    container: any;
    userInfo: any
  }
  
  export interface ChildrenObject {
    path: string;
    title: string;
    icon: string;
    lazyload: boolean;
    children?: Array<ChildrenObject>;
    exact: boolean;
    componentUrl: string;
    component: any;
  }