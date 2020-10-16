import { IDeviceTypeSettingState } from './device-type-setting.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useDeviceTypeSettingStore() {
  const { state, setStateWrap } = useStateStore(new IDeviceTypeSettingState());
  return { state };
}
