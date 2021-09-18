export class IHomeHeader {
  visibleModal = false;
  confirmDirty = false;
  confirmLoading = false;
}

export interface IHomeHeaderProps {
  extra?: () => JSX.Element;
}
