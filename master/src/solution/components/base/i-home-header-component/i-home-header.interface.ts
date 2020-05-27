import { FormComponentProps } from 'antd/lib/form/Form';

export class IHomeHeader {
  visibleModal = false;
  confirmDirty = false;
  confirmLoading = false;
}

export interface IHomeHeaderProps extends FormComponentProps {}
