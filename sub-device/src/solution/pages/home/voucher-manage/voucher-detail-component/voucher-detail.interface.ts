/**
 * @export state变量定义和初始化
 * @class IVoucherDetailState
 */
export class IVoucherDetailState {
  details: any;
}
export class IVoucherDetailProps {
  id: string;
  visible: boolean;
  close: () => void;
}
