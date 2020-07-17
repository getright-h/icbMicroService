/**
 * @export state变量定义和初始化
 * @class IIEditPasswordState
 */
export class IIEditPasswordProps {
  visible: boolean;
  userId: string;
  close: () => void;
}
export class IIEditPasswordState {
  confirmLoading = false;
}
