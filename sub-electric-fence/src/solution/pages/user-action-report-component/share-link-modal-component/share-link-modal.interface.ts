/**
 * @export state变量定义和初始化
 * @class IShareLinkModalState
 */
export class IShareLinkModalState {
  copyValue = '';
}

export class IShareLinkModalProps {
  searchKey: string;
  isModalVisible: boolean;
  handleCancel: () => void;
}
