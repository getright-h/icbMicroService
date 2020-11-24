/**
 * @export state变量定义和初始化
 * @class ITemplateAddState
 */
export class ITemplateAddState {
  confirmLoading = false;
}

export class ITemplateAddProps {
  visible: boolean;
  // id: string;
  close: (isSuccess: boolean) => void;
}
