/**
 * @export state变量定义和初始化
 * @class IVirtureListState
 */
export class IVirtureListState {
  showData: Array<any> = [];
  scrollHeight = 0;
}

export interface IVirtureListProps {
  options: {
    itemHeight: number; // 代表的每个item的高度
  };
  style: { [key: string]: number | string };
  children?: any;
  data: any;
}
