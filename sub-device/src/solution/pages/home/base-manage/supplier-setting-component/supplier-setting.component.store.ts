import { ISupplierSettingState } from './supplier-setting.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useSupplierSettingStore() {
  const { state, setStateWrap } = useStateStore(new ISupplierSettingState());
  return { state };
}
