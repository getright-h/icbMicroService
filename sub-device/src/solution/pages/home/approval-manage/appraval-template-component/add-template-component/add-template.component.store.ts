import { IAddTemplateState } from './add-template.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useAddTemplateStore() {
  const { state, setStateWrap } = useStateStore(new IAddTemplateState());
  return { state };
}
