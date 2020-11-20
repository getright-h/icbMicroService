import { IAlarmParameterState } from './alarm-parameter.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useAlarmParameterStore() {
  const { state, setStateWrap } = useStateStore(new IAlarmParameterState());
  return { state };
}
