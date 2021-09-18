/**
 * @export state变量定义和初始化
 * @class ITemplateAddState
 */
export class ITemplateAddState {
  confirmLoading = false;
}

export class ITemplateAddProps {
  visible: boolean;
  info: Record<string, any>;
  close: (isSuccess: boolean) => void;
}
