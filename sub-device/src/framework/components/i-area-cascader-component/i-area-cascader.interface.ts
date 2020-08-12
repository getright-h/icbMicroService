/**
 * @export state变量定义和初始化
 * @class IIAreaCascaderState
 */
export class IIAreaCascaderState {
  areaOptions: any;
  value: string[];
}
export class IIAreaCascaderProps {
  setAreaInfo: (value: any, selectedOptions: any) => void;
  defaultValue?: string[];
  deep: number;
}
