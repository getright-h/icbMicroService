/**
 * @export state变量定义和初始化
 * @class IAddWarehouseState
 */
export class IAddWarehouseState {
  confirmLoading: boolean;
  editOrganizationName = '';
  editmanageName = '';
  areaDetail: string[];
}

export class IAddWarehouseProps {
  addWarehouseVisible = false;
  isEdit? = false;
  warehouseId? = '';
  closeAddWarehouseModal: (isRefresh?: boolean, data?: object, isEdit?: boolean) => void;
}
