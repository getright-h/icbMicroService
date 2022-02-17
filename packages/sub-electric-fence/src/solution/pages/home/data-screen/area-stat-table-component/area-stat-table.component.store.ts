import { IAreaStatTableProps, IAreaStatTableState } from './area-stat-table.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';

export function useAreaStatTableStore(props: IAreaStatTableProps) {
  const { state, setStateWrap } = useStateStore(new IAreaStatTableState());

  useEffect(() => {
    if (!!props.propData.length) {
      setStateWrap({ scrollData: props.propData });
    } else {
      setStateWrap({ scrollData: [] });
    }
  }, [props.propData]);

  return { state };
}
