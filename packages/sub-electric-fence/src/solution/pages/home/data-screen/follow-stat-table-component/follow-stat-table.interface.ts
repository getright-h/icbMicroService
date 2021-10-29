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
  scrollData: ScrollDataDto[] = [];
}

/**
 * @export props变量定义和初始化
 * @class IFollowStatTableProps
 */
export class IFollowStatTableProps {
  propData: OrganizationAlarmStatisticDto;
}

export interface ScrollDataDto extends OrganizationAlarmStatisticData {
  id: string;
}
