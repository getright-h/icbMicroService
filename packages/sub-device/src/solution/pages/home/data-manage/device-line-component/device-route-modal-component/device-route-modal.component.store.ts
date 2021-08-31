import { IDeviceRouteModalState, IDeviceLineProp } from './device-route-modal.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';

export function useDeviceRouteModalStore(props: IDeviceLineProp) {
  const { state, setStateWrap } = useStateStore(new IDeviceRouteModalState());

  function onSubmit() {
    props.close && props.close();
  }

  useEffect(() => {}, [props.data?.typeId]);
  return { state, onSubmit };
}
