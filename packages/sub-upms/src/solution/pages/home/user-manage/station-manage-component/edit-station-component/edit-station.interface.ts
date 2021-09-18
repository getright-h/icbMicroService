/**
 * @export state变量定义和初始化
 * @class IEditStationState
 */
export class IEditStationState {
  confirmLoading = false;
  parentCode = '';
  roleList: Array<{
    id: string;
    name: string;
    state: boolean;
    code: string;
    originalCode: string;
    systemId: string;
  }>;
}

export class IEditStationProps {
  title: string;
  visible: boolean;
  isEdit: boolean;
  close: (isSuccess?: boolean) => void;
  info: Record<string, any>;
}
