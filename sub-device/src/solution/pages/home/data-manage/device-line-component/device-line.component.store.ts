import { IDeviceLineState } from './device-line.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useDeviceLineStore() {
  const { state, setStateWrap } = useStateStore(new IDeviceLineState());
  return { state };
}
