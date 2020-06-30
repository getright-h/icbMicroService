import { IMainFenceManageState } from './main-fence-manage.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useMainFenceManageStore() {
  const { state, setStateWrap } = useStateStore(new IMainFenceManageState());
  function searchClick() {
    console.log('search');
  }

  function onValueChange<T>(key: string, value: T) {
    console.log(key, value);

    setStateWrap({
      [key]: value
    });
  }

  // function onCrPlaceChangeBack(value)
  return {
    state,
    onValueChange,
    searchClick
  };
}
