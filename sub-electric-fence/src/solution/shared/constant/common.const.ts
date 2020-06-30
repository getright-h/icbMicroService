export enum ADDRESS_TYPE {
  Province,
  City,
  Area
}

export const PAGES_MENU = {
  MENU: [
    {
      path: 'home',
      title: '电子围栏',
      icon: 'container',
      children: [
        {
          path: 'mainfence',
          title: '围栏管理',
          icon: 'container'
        }
      ]
    }
  ]
};
