/**
 * @export state变量定义和初始化
 * @class IEditDepartmentState
 */
export class IEditDepartmentState {
  confirmLoading = false;
  parentCode = '';
  typeId: string;
}

export class IEditDepartmentProps {
  title: string;
  visible: boolean;
  isEdit: boolean;
  close: (isSuccess?: boolean) => void;
  info: Record<string, any>;
}
