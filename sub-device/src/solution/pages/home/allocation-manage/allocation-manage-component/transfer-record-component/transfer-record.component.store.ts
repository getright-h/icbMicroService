import { ITransferRecordState, ITransferRecordProps } from './transfer-record.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useTransferRecordStore(props: ITransferRecordProps) {
  const { state, setStateWrap } = useStateStore(new ITransferRecordState());

  function selfClose() {
    props.close && props.close();
  }

  return { state, selfClose };
}
