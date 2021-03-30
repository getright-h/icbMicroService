declare namespace LazyloadLoadingComponentLessNamespace {
  export interface ILazyloadLoadingComponentLess {
    blob: string;
    'loading-info': string;
    loadingInfo: string;
    spin: string;
  }
}

declare const LazyloadLoadingComponentLessModule: LazyloadLoadingComponentLessNamespace.ILazyloadLoadingComponentLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: LazyloadLoadingComponentLessNamespace.ILazyloadLoadingComponentLess;
};

export = LazyloadLoadingComponentLessModule;
