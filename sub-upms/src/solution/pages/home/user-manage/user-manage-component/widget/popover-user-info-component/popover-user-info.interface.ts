import { UserBelongInfoResponse } from '~/solution/model/dto/user-manage.dto';

/**
 * @export state变量定义和初始化
 * @class IPopoverUserInfoState
 */
export class IPopoverUserInfoState {
  data: UserBelongInfoResponse[] = [];
  visible = false;
}
export class IPopoverUserInfoProps {
  userId: string;
}
