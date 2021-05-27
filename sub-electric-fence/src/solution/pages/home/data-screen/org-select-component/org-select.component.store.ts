import { IOrgSelectState } from './org-select.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useOrgSelectStore() {
  const { state, setStateWrap } = useStateStore(new IOrgSelectState());
  return { state };
}
