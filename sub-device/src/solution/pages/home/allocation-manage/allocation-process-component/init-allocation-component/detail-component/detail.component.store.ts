import { IDetailState } from './detail.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export function useDetailStore() {
  const { state, setStateWrap } = useStateStore(new IDetailState());
  const { id } = useParams();
  useEffect(() => {
    getDetails(id);
  }, []);
  function getDetails(id: string) {
    setStateWrap({
      deviceData: [
        {
          name: 'ICB10001',
          number: 20
        },
        {
          name: 'ICB10002',
          number: 40
        }
      ]
    });
  }
  return { state };
}
