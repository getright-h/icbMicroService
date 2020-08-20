import { IStockRecordState, IStockRecordProps } from './stock-record.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useStockRecordStore(props: IStockRecordProps) {
  const { state, setStateWrap } = useStateStore(new IStockRecordState());

  function selfClose() {
    props.close && props.close();
  }
  return { state, selfClose };
}
