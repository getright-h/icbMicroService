import { IAlarmConfigState } from './alarm-config.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useAlarmConfigStore() {
  const { state, setStateWrap } = useStateStore(new IAlarmConfigState());
  return { state };
}
