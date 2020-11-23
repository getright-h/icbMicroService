import { IDeviceListSelectProps, IDeviceListSelectState } from './device-list-select.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';

export function useDeviceListSelectStore(props: IDeviceListSelectProps) {
  const { state, setStateWrap } = useStateStore(new IDeviceListSelectState());

  useEffect(() => {
    setStateWrap({ editTypeName: props.defaultInfo?.typeName });
  }, [props.defaultInfo]);

  function handleDeviceChange(typeName: string, option: any) {
    typeName == 'type' && setStateWrap({ editTypeName: option?.info.name });
    props.handleDeviceChange(typeName, option);
  }

  return { state, handleDeviceChange };
}
