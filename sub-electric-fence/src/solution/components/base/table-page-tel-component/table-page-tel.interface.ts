import { TablePageTelStore } from './table-page-tel.component.store';
declare const PlacementTypes: ["top", "right", "bottom", "left"];
declare type placementType = typeof PlacementTypes[number];
declare type getContainerFunc = () => HTMLElement;
export interface IProps {
   // 当前的table信息
  tablePageTelStore?: TablePageTelStore,
  // 当前的header名
  pageName?: string,
  // 是否需要开启flex
  isFlex?: boolean,
   // 左边flex的值
  leftFlex?: number | string,
  // 右边flex的值
  rightFlex?: number | string,
  // page 左边的内容和table显示的信息同级
  pageLeft?: any,
  //搜索的tags信息
  selectTags?: any,
  //选择的item信息
  selectItems?: any,
  //基本的搜索按钮
  searchButton?: any,
  // 另外的搜索按钮
  otherSearchBtns?: any,
  // 传入的table组件
  table?: any,
  // table组件是否要在左边
  isLeft?: boolean,
  // 在页面添加Drawer组件
  drawerInfo?: {
    width?: string | number;
    closable?: boolean;
    maskClosable?: boolean;
    mask?: boolean;
    visible?: boolean;
    styleInfo?: object;
    onCloseDrawer?: () => void;
    placement?: placementType | any;
    title?: string;
    container: any;
    getContainer?: string | HTMLElement | getContainerFunc | false | any;
  }
}