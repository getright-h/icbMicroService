/**
 * @export state变量定义和初始化
 * @class IAddShippingSpaceState
 */
export class IAddShippingSpaceState {
  confirmLoading = false;
}

export class IAddShippingSpaceProps {
  addShippingSpaceVisible = false;
  isEdit? = false;
  shippingSpaceId? = '';
  closeShippingSpaceModal?: (isRefresh?: boolean) => void;
}
