import { IWarehouseLeftState } from './warehouse-left.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useWarehouseLeftStore() {
  const { state, setStateWrap } = useStateStore(new IWarehouseLeftState());

  function action<T>(type: string, data?: T) {
    setStateWrap({ currentId: data ? data.id : '' });
    switch (type) {
      case 'add':
        setStateWrap({ visibleModal: true });
      default:
        break;
    }
  }

  function modalCancel() {
    setStateWrap({ visibleModal: false });
  }
  return { state, action, modalCancel };
}
