import { IAddMonitorGroupState, AddMonitorGroupProp } from './add-monitor-group.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';

export function useAddMonitorGroupStore(props: AddMonitorGroupProp) {
  const { state, setStateWrap } = useStateStore(new IAddMonitorGroupState());
  useEffect(() => {}, [props.data?.id]);
  return { state };
}
