/**
 * @export state变量定义和初始化
 * @class IWarehouseCascaderState
 */
export class IWarehouseCascaderState {
  warehouseOptions: any;
  value: string[];
}

export class IWarehouseCascaderProps {
  setInfo?: (value: any, selectedOptions: any) => void;
  defaultValue?: string[];
  organizationId: string;
  value?: string[];
}
