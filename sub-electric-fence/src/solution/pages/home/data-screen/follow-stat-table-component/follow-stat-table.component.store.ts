import { IFollowStatTableProps, IFollowStatTableState, ScrollDataDto } from './follow-stat-table.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef } from 'react';
import { OrganizationAlarmStatisticData } from '~/solution/model/dto/data-screen.dto';

const MIN_LENGTH = 4;

export function useFollowStatTableStore(props: IFollowStatTableProps) {
  const { state, setStateWrap } = useStateStore(new IFollowStatTableState());
  const scrollRef = useRef<HTMLUListElement>();
  const anime = useRef<Animation>(null);

  useEffect(() => {
    if (!!props.propData.data.length) {
      formatScrollData(props.propData.data);
    } else {
      setStateWrap({ scrollData: [] });
    }
  }, [props.propData.data]);

  useEffect(() => {
    initAnimation();
  }, [state.scrollData]);

  function formatScrollData(dataList: OrganizationAlarmStatisticData[]) {
    // dataList连接三次作为滚动数据，达到无缝滚动（包括每行背景色）效果
    let scrollData: ScrollDataDto[] = [];
    if (props.propData.data.length >= MIN_LENGTH) {
      scrollData = handleDataList(dataList)
        .concat(handleDataList(dataList, '1'))
        .concat(handleDataList(dataList, '2'));
    } else {
      scrollData = handleDataList(dataList);
    }
    setStateWrap({ alarmStatistic: props.propData, scrollData });
  }

  function handleDataList(dataList: OrganizationAlarmStatisticData[], char?: string): ScrollDataDto[] {
    return dataList.map(d => {
      return {
        ...d,
        id: char ? d.organizationId.slice(0, -1) + char : d.organizationId
      };
    });
  }

  function initAnimation() {
    const len = props.propData.data.length;
    if (len >= MIN_LENGTH) {
      scrollRef.current.animate([{ top: 0 }, { top: -len * 2 * 36 + 'px' }], {
        duration: 1500 * len * 2,
        iterations: Infinity
      });
    } else {
      anime.current && anime.current.cancel();
    }
  }
  return { state, scrollRef };
}
