import { IFollowStatTableProps, IFollowStatTableState } from './follow-stat-table.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef } from 'react';
import { OrganizationAlarmStatisticDto } from '~/solution/model/dto/data-screen.dto';

export function useFollowStatTableStore(props: IFollowStatTableProps) {
  const { state, setStateWrap } = useStateStore(new IFollowStatTableState());
  const dataRef = useRef<OrganizationAlarmStatisticDto>();

  useEffect(() => {
    if (props.propData.data.length) {
      dataRef.current = { ...props.propData };
      formatScrollData();
    }
  }, [props.propData]);

  function formatScrollData() {
    const { alarmTotal, followedTotal, followingTotal, unFollowTotal } = dataRef.current;
    setStateWrap({
      alarmStatistic: { alarmTotal, followedTotal, followingTotal, unFollowTotal },
      scrollData: dataRef.current.data
    });
  }

  return { state };
}
