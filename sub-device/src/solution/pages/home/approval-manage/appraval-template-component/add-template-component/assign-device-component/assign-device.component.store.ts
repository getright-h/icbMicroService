import { IAssignDeviceState } from './assign-device.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useAssignDeviceStore() {
  const { state, setStateWrap } = useStateStore(new IAssignDeviceState());
  return { state };
}
