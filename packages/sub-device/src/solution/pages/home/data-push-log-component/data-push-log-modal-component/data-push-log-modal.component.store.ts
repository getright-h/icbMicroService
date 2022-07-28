import { IDataPushLogModalState, IDataPushLogModalProps } from './data-push-log-modal.interface';
import { useStateStore } from '@fch/fch-tool';

export function useDataPushLogModalStore(props: IDataPushLogModalProps) {
  const { state, setStateWrap } = useStateStore(new IDataPushLogModalState());
  function handleOk() {
    props.close();
  }

  function cancelModal() {
    props.close();
  }
  return { state, handleOk, cancelModal };
}
