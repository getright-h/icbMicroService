declare namespace CubeComponentLessNamespace {
  export interface ICubeComponentLess {
    cube: string;
    stage: string;
  }
}

declare const CubeComponentLessModule: CubeComponentLessNamespace.ICubeComponentLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CubeComponentLessNamespace.ICubeComponentLess;
};

export = CubeComponentLessModule;
