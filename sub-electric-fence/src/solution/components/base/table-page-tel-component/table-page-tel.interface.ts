import { TablePageTelStore } from './table-page-tel.component.store';
declare const PlacementTypes: ["top", "right", "bottom", "left"];
declare type placementType = typeof PlacementTypes[number];
declare type getContainerFunc = () => HTMLElement;
export interface IProps {
  tablePageTelStore?: TablePageTelStore,
  pageName?: string,
  isFlex?: boolean,
  leftFlex?: number,
  rightFlex?: number,
  pageLeft?: any,
  selectTags?: any,
  selectItems?: any,
  searchButton?: any,
  otherSearchBtns?: any,
  table?: any,
  isLeft?: boolean,
  drawerInfo?: {
    width: string | number;
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