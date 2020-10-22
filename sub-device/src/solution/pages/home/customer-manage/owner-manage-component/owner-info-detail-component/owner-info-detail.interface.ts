/**
 * @export state变量定义和初始化
 * @class IOwnerInfoDetailState
 */
export class IOwnerInfoDetailState {
  confirmLoading = false;
  hasMore = false;
  details: any;
}
/**
 * @export props变量定义和初始化
 * @class IOwnerInfoDetailProps
 */
export class IOwnerInfoDetailProps {
  id: string;
  visible: boolean;
  close: () => void;
}
