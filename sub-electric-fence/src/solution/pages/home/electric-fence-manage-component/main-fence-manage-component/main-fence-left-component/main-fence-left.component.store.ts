import { IMainFenceLeftState } from './main-fence-left.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useMainFenceLeftStore() {
  const { state, setStateWrap } = useStateStore(new IMainFenceLeftState());
  function callbackAction<T>(actionType: number, data: T) {
    switch (actionType) {
      case ACTION_TYPE.EDIT:
        console.log(data);

        break;
      case ACTION_TYPE.DELETE:
        console.log(data);
        break;
      default:
        break;
    }
  }

  function searchClick() {
    console.log(1);
  }

  function changeTablePageIndex(index: number, pageSize: number) {
    console.log(index, pageSize);
  }
  return { state, callbackAction, changeTablePageIndex, searchClick };
}
