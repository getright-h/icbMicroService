import { RoleInfo } from '~/solution/model/dto/role-manage.dto';

/**
 * @export state变量定义和初始化
 * @class IAddUserState
 */
export class IAddUserState {
  confirmLoading = false;
  positionRoles: string[] = [];
  roleOptions: RoleInfo[] = [];
}
export class IAddUserProps {
  isEdit: boolean;
  isDetail: boolean;
  visible: boolean;
  userId: string;
  close: (isSuccess?: boolean) => void;
}
