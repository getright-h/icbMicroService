/**
 * @export state变量定义和初始化
 * @class IEditOwnerInfoState
 */
export class IEditOwnerInfoState {
  confirmLoading = false;
  isEdit = false;
  hasMore = false;
  areaValues: string[] = [];
  areaInfo = {};
}
/**
 * @export props变量定义和初始化
 * @class IEditOwnerInfoProps
 */
export class IEditOwnerInfoProps {
  id: string;
  visible: boolean;
  close: (isSuccess: boolean) => void;
}
