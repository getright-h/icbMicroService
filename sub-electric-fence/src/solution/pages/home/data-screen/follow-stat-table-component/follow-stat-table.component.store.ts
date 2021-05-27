import { IFollowStatTableState } from './follow-stat-table.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef } from 'react';
import { tempData } from './follow-stat.column';

export function useFollowStatTableStore() {
  const { state, setStateWrap } = useStateStore(new IFollowStatTableState());
  const scrollRef = useRef<HTMLUListElement>();

  useEffect(() => {
    scrollRef.current.animate([{ top: 0 }, { top: -tempData.length * 2 * 36 + 'px' }], {
      duration: 1500 * tempData.length * 2,
      iterations: Infinity
    });
  }, [tempData.length]);
  return { state, scrollRef };
}
