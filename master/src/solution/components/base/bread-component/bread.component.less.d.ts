declare namespace BreadComponentLessNamespace {
  export interface IBreadComponentLess {
    bread: string;
  }
}

declare const BreadComponentLessModule: BreadComponentLessNamespace.IBreadComponentLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: BreadComponentLessNamespace.IBreadComponentLess;
};

export = BreadComponentLessModule;
