/**
 * @export state变量定义和初始化
 * @class IBulkImportState
 */
export class IBulkImportState {
  confirmLoading = false;
}
/**
 * @export props变量定义和初始化
 * @class IBulkImportProps
 */
export class IBulkImportProps {
  visible: boolean;
  close: () => void;
}
