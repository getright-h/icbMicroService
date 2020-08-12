export interface AppConfig {
    // 包含以系列方法来自父应用
    baseFuntion: any;
    name: string;
    routers: Array<ChildrenObject>;
    routerBase: string,
    container: any;
  }
  
  export interface ChildrenObject {
    path: string;
    title: string;
    icon: string;
    lazyload: boolean;
    exact: boolean;
    componentUrl: string;
    component: any;
  }