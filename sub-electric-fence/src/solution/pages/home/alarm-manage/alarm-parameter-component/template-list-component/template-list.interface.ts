/**
 * @export state变量定义和初始化
 * @class ITemplateListState
 */
export class ITemplateListState {
  confirmLoading = false;
}
export class ITemplateListProps {
  visible: boolean;
  // id: string;
  close: (isSuccess: boolean) => void;
}
