import { IFollowStatTableProps, IFollowStatTableState, ScrollDataDto } from './follow-stat-table.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef } from 'react';
import { OrganizationAlarmStatisticData, OrganizationAlarmStatisticDto } from '~/solution/model/dto/data-screen.dto';
import { generateGUID } from '@fch/fch-tool';

const MIN_LENGTH = 4;

export function useFollowStatTableStore(props: IFollowStatTableProps) {
  const { state, setStateWrap } = useStateStore(new IFollowStatTableState());
  const scrollRef = useRef<HTMLUListElement>();
  const anime = useRef<Animation>(null);
  const dataRef = useRef<OrganizationAlarmStatisticDto>();

  useEffect(() => {
    anime.current && anime.current.cancel();
    if (props.propData.data.length) {
      dataRef.current = { ...props.propData };
      console.log('dataRef.current', dataRef.current);

      formatScrollData();
    }
  }, [props.propData]);

  // useEffect(() => {
  //   initAnimation();
  // }, [state.scrollData]);

  function formatScrollData() {
    // dataList连接三次作为滚动数据，达到无缝滚动（包括每行背景色）效果
    let scrollData: ScrollDataDto[] = [];
    if (dataRef.current.data.length >= MIN_LENGTH) {
      scrollData = handleDataList(dataRef.current.data);
    } else {
      scrollData = handleDataList(dataRef.current.data);
    }
    const { alarmTotal, followedTotal, followingTotal, unFollowTotal } = dataRef.current;
    setStateWrap(
      { alarmStatistic: { alarmTotal, followedTotal, followingTotal, unFollowTotal }, scrollData }
      // initAnimation
    );
  }

  function handleDataList(dataList: OrganizationAlarmStatisticData[], char?: string): ScrollDataDto[] {
    return dataList.map(d => {
      return {
        ...d,
        id: char ? generateGUID() : d.organizationId
      };
    });
  }
  return { state, scrollRef };
}
