import { IOrderDetailState, IOrderDetailProps } from './order-detail.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export function useOrderDetailStore(props: IOrderDetailProps) {
  const { state, setStateWrap } = useStateStore(new IOrderDetailState());
  const { id } = useParams();

  useEffect(() => {
    getDetails(id);
  }, []);

  function getDetails(id: string) {
    setStateWrap({
      tableData: [
        {
          id: '16351',
          product: 'OBD-10001',
          num: 10,
          amount: '100.00'
        }
      ]
    });
  }

  function selfClose() {
    props.close && props.close();
  }

  return { state, selfClose };
}
