declare namespace NotFoundComponentLessNamespace {
  export interface INotFoundComponentLess {
    button: string;
    main: string;
    'not-found-view': string;
    notFoundView: string;
  }
}

declare const NotFoundComponentLessModule: NotFoundComponentLessNamespace.INotFoundComponentLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: NotFoundComponentLessNamespace.INotFoundComponentLess;
};

export = NotFoundComponentLessModule;
