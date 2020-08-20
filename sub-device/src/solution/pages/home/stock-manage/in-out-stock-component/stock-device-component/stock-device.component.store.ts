import { IStockDeviceState, IStockDeviceProps } from './stock-device.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';

export function useStockDeviceStore(props: IStockDeviceProps) {
  const { state, setStateWrap } = useStateStore(new IStockDeviceState());

  useEffect(() => {
    setStateWrap({
      tableData: [
        { id: '1', name: 'OBD1', number: '23155487446' },
        { id: '2', name: 'OBD2', number: '23155487446' },
        { id: '3', name: 'OBD3', number: '23155487446' }
      ]
    });
  }, []);

  function selfClose() {
    props.close && props.close();
  }
  return { state, selfClose };
}
