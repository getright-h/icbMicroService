export interface IMenu {
  icon?:string,
  title:string,
  path: string,
  paths:string,
  children?:IMenu[],
}

export interface IProps {
  // 菜单列表
  menuList:IMenu[],
  expandList?: string[],
  currentUrl: string,
  defaultSelectedKeys?:string[],
  defaultOpenKeys?:string[],
}