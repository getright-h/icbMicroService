import { IAssignDeviceShowState } from './assign-device-show.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useAssignDeviceShowStore() {
  const { state, setStateWrap } = useStateStore(new IAssignDeviceShowState());
  return { state };
}
