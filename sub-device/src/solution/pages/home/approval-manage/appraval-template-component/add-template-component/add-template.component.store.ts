import { IAddTemplateState } from './add-template.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { AddTemplateState } from './add-template-redux/add-template-reducer';

export function useAddTemplateStore(addTemplateState: AddTemplateState) {
  const { state, setStateWrap } = useStateStore(new IAddTemplateState());
  function next() {
    console.log(addTemplateState);

    setStateWrap({
      current: state.current + 1
    });
  }

  function prev() {
    setStateWrap({
      current: state.current - 1
    });
  }

  function commit() {}
  return { state, next, prev, commit };
}
