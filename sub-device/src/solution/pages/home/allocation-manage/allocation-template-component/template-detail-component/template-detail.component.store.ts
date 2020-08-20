import { ITemplateDetailState } from './template-detail.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export function useTemplateDetailStore() {
  const { state, setStateWrap } = useStateStore(new ITemplateDetailState());
  const { id } = useParams();
  useEffect(() => {
    console.log('id', id);
  }, []);
  return { state };
}
