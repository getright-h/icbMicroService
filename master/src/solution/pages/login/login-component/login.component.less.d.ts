declare namespace LoginComponentLessNamespace {
  export interface ILoginComponentLess {
    errorMsg: string;
    formFlexItem: string;
    left: string;
    leftCover: string;
    loginBox: string;
    loginBtn: string;
    main: string;
    right: string;
    siteTitleBox: string;
    stage: string;
    vcodeBox: string;
    vcodeInput: string;
    welcome: string;
  }
}

declare const LoginComponentLessModule: LoginComponentLessNamespace.ILoginComponentLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: LoginComponentLessNamespace.ILoginComponentLess;
};

export = LoginComponentLessModule;
