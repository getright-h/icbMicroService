export interface IMenu {
  icon?:string,
  title:string,
  path: string,
  paths:string,
  children?:IMenu[],
}

export interface IProps {
  // ่ๅๅ่กจ
  menuList:IMenu[],
  expandList?: string[],
  currentUrl: string,
  defaultSelectedKeys?:string[],
  defaultOpenKeys?:string[],
}