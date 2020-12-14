import { IPositionMonitorMapbtnDrivingLineState, SELECTDATE } from './position-monitor-mapbtn-driving-line.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import moment from 'moment';
import { useEffect } from 'react';
import { PositionMonitorService } from '~/solution/model/services/position-monitor.service';
import { TPositionMonitor } from '../position-monitor-redux/position-monitor-reducer';
import { formatToUnix } from '~/solution/shared/util/common.util';
export function usePositionMonitorMapbtnDrivingLineStore(reduxState: TPositionMonitor) {
  const { state, setStateWrap } = useStateStore(new IPositionMonitorMapbtnDrivingLineState());
  const { carSpeedBase, drivingLineData, deviceCode, timeInfo } = state;
  const { pointList } = drivingLineData;
  const { currentDoActionCarInfo } = reduxState;
  const positionMonitorService: PositionMonitorService = useService(PositionMonitorService);
  useEffect(() => {
    // 当前需要查看信息的车
    if (currentDoActionCarInfo) {
      setStateWrap({
        deviceCode: currentDoActionCarInfo.deviceInfo.deviceCode
      });
    }
  }, [currentDoActionCarInfo]);
  function changeTablePageIndex() {}

  function onShowTableClick() {
    setStateWrap({
      showTable: !state.showTable
    });
  }

  function getCurrentLine(code: string) {
    positionMonitorService.realTimeTracking({ code }).subscribe(res => {
      // setStateWrap({ carLine: res });
    });
  }

  function setEndRunning() {
    setStateWrap({
      isRunning: true,
      carSpeedBase: 1,
      currentPoint: drivingLineData.pointList.length - 1
    });
  }

  function changeSliderProgress(value: number) {
    setStateWrap({
      currentPoint: value
    });
  }

  function getDeviceCode(value: string) {
    setStateWrap({
      deviceCode: value
    });
  }

  function changeDateTimeRange(value: SELECTDATE | string) {
    let timeInfo: string[] = [];

    const time = moment().format('YYYY-MM-DD');
    switch (value) {
      case SELECTDATE.TODAY:
        timeInfo = [time + ' 00:00:00', time + ' 23:59:59'];
        break;
      case SELECTDATE.YESTORDAY:
        const YTime = moment()
          .subtract(1, 'd')
          .format('YYYY-MM-DD');
        timeInfo = [YTime + ' 00:00:00', YTime + ' 23:59:59'];
        break;
      case SELECTDATE.BEFOREYESTORDAY:
        const BTime = moment()
          .subtract(2, 'd')
          .format('YYYY-MM-DD');
        timeInfo = [BTime + ' 00:00:00', BTime + ' 23:59:59'];
        break;
      case SELECTDATE.RECENTSERVENDAY:
        const STime = moment()
          .subtract(1, 'w')
          .format('YYYY-MM-DD');
        timeInfo = [STime + ' 00:00:00', time + ' 23:59:59'];
        break;
      case SELECTDATE.RECENTTHIRDTY:
        const TTime = moment()
          .subtract(1, 'M')
          .format('YYYY-MM-DD');
        timeInfo = [TTime + ' 00:00:00', time + ' 23:59:59'];
        break;
      default:
        break;
    }

    setStateWrap({
      timeInfo,
      dateTimeRangeControllerValue: value
    });
  }

  function getDateTimeInfo(value: any) {
    if (!value[0] && !value[1]) {
      value = undefined;
    }
    setStateWrap({
      timeInfo: value,
      dateTimeRangeControllerValue: undefined
    });
  }

  function runCurrentPoint(index: number) {
    setStateWrap({
      currentPoint: index
    });
  }

  function onSwitchOFFONClick(isON: boolean) {
    setStateWrap({
      isRunning: isON
    });
  }

  function onSpeedChangeClick(isFast: boolean) {
    const carSpeedInfo = isFast ? carSpeedBase * 2 : carSpeedBase / 2;
    setStateWrap({
      carSpeedBase: carSpeedInfo
    });
  }

  function confirmRun() {
    const params = {
      deviceCode,
      beginTime: timeInfo && timeInfo[0] ? formatToUnix(timeInfo[0]) : -1,
      endTime: timeInfo && timeInfo[1] ? formatToUnix(timeInfo[1]) : -1
    };
    positionMonitorService.queryVehicleHistoryTrajectory(params).subscribe(res => {
      setStateWrap({
        drivingLineData: res
      });
    });
    positionMonitorService.queryVehicleTrajectoryArrayList(params).subscribe(res => {
      setStateWrap({
        tableData: res
      });
    });
  }
  return {
    state,
    changeTablePageIndex,
    onShowTableClick,
    changeDateTimeRange,
    getDateTimeInfo,
    onSwitchOFFONClick,
    onSpeedChangeClick,
    confirmRun,
    setEndRunning,
    runCurrentPoint,
    getDeviceCode,
    changeSliderProgress
  };
}
