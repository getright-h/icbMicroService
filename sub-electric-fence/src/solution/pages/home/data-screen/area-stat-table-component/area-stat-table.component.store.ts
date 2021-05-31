import { IAreaStatTableProps, IAreaStatTableState } from './area-stat-table.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef } from 'react';
import { GpsPanelVehicleRegionDto } from '~/solution/model/dto/data-screen.dto';

const MIN_LENGTH = 3;

export function useAreaStatTableStore(props: IAreaStatTableProps) {
  const { state, setStateWrap } = useStateStore(new IAreaStatTableState());
  const scrollRef = useRef<HTMLUListElement>();
  const anime = useRef<Animation>(null);

  useEffect(() => {
    !!props.propData.length && formatScrollData(props.propData);
  }, [props.propData]);

  useEffect(() => {
    initAnimation();
  }, [state.scrollData]);

  function formatScrollData(dataList: GpsPanelVehicleRegionDto[]) {
    const sortList = dataList.sort((a, b) => b.onlineCount - a.onlineCount);
    let scrollData: GpsPanelVehicleRegionDto[] = [];
    if (sortList.length >= MIN_LENGTH) {
      scrollData = sortList.concat(sortList.slice(0, 2));
    } else {
      scrollData = sortList;
    }
    setStateWrap({ scrollData });
  }

  function initAnimation() {
    const len = props.propData.length;
    if (len >= MIN_LENGTH) {
      anime.current = scrollRef.current.animate([{ top: 0 }, { top: -len * 28 + 'px' }], {
        duration: 1500 * len,
        iterations: Infinity
      });
    } else {
      anime.current && anime.current.cancel();
    }
  }
  return { state, scrollRef };
}
