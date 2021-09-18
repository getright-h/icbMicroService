import { FormInstance } from 'antd/lib/form';

/**
 * @export state变量定义和初始化
 * @class IFollowUpState
 */
export class IFollowUpState {}

export interface FollowUpComponentProps {
  onValuesChange?: (form: FormInstance | any ) => void;
  id: string;
}
