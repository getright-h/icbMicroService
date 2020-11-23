declare namespace IHomeHeaderComponentLessNamespace {
  export interface IIHomeHeaderComponentLess {
    container: string;
    'fold-icon': string;
    foldIcon: string;
    header: string;
    'header-left': string;
    'header-logo': string;
    'header-right': string;
    headerLeft: string;
    headerLogo: string;
    headerRight: string;
    'logo-container': string;
    logoContainer: string;
    main: string;
    setting: string;
    trigger: string;
  }
}

declare const IHomeHeaderComponentLessModule: IHomeHeaderComponentLessNamespace.IIHomeHeaderComponentLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: IHomeHeaderComponentLessNamespace.IIHomeHeaderComponentLess;
};

export = IHomeHeaderComponentLessModule;
