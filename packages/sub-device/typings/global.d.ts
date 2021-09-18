declare module '*.less';
declare module '*.css';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';

declare interface Window {
  __POWERED_BY_QIANKUN__: boolean,
  __INJECTED_PUBLIC_PATH_BY_QIANKUN__: string;
  $store: any
}

declare let __webpack_public_path__: string;