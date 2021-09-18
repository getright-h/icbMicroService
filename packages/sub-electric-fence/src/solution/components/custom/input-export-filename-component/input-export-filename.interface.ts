/**
 * @export state变量定义和初始化
 * @class IInputExportFilenameState
 */
export class IInputExportFilenameState {}

export class IInputExportFilenameProps {
  visible: boolean;
  getValues: (values: Record<string, any>) => void;
  close: () => void;
}
