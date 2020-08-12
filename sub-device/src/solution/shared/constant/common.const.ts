export enum ADDRESS_TYPE {
  Province,
  City,
  Area
}

export const PAGES_MENU = {
  MENU: [
    {
      path: 'home',
      title: 'XX模块',
      icon: 'container',
      children: [
        {
          path: 'demo',
          title: 'XX管理-示例页面',
          icon: 'container'
        },
        {
          path: 'reduxHooks',
          title: 'XXHookRedux',
          icon: 'container'
        }
      ]
    }
  ]
};
