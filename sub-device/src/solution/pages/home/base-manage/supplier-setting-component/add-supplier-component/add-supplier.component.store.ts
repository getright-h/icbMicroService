import { IAddSupplierState } from './add-supplier.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useAddSupplierStore() {
  const { state, setStateWrap } = useStateStore(new IAddSupplierState());
  return { state };
}
