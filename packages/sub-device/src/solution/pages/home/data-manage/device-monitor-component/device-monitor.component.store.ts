import { IDeviceMonitorState } from './device-monitor.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useDeviceMonitorStore() {
  const { state, setStateWrap } = useStateStore(new IDeviceMonitorState());
  return { state };
}
