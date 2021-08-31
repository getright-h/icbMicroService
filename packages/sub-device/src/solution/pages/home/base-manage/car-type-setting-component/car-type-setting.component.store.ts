import { ICarTypeSettingState } from './car-type-setting.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useCarTypeSettingStore() {
  const { state, setStateWrap } = useStateStore(new ICarTypeSettingState());
  return { state };
}
