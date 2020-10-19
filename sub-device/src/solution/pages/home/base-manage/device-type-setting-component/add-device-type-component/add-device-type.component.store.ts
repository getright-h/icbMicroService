import { IAddDeviceTypeState } from './add-device-type.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useAddDeviceTypeStore() {
  const { state, setStateWrap } = useStateStore(new IAddDeviceTypeState());
  return { state };
}
