declare namespace HomeComponentLessNamespace {
  export interface IHomeComponentLess {
    'body-container': string;
    bodyContainer: string;
    'home-main': string;
    homeMain: string;
    'page-container': string;
    pageContainer: string;
  }
}

declare const HomeComponentLessModule: HomeComponentLessNamespace.IHomeComponentLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: HomeComponentLessNamespace.IHomeComponentLess;
};

export = HomeComponentLessModule;
