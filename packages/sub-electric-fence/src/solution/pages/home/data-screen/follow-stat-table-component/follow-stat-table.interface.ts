import { OrganizationAlarmStatisticData, OrganizationAlarmStatisticDto } from '~/solution/model/dto/data-screen.dto';

/**
 * @export state变量定义和初始化
 * @class IFollowStatTableState
 */
export class IFollowStatTableState {
  alarmStatistic: Omit<OrganizationAlarmStatisticDto, 'data'> = {
    alarmTotal: 0,
    followedTotal: 0,
    followingTotal: 0,
    unFollowTotal: 0
  };
  scrollData: OrganizationAlarmStatisticData[] = [];
}

/**
 * @export props变量定义和初始化
 * @class IFollowStatTableProps
 */
export class IFollowStatTableProps {
  propData: OrganizationAlarmStatisticDto;
}
