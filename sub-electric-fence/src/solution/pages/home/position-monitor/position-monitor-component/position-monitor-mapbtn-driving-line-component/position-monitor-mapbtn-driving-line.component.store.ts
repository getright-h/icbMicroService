import { IPositionMonitorMapbtnDrivingLineState, SELECTDATE } from './position-monitor-mapbtn-driving-line.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import moment from 'moment';
import { useEffect } from 'react';
import { PositionMonitorService } from '~/solution/model/services/position-monitor.service';
import { TPositionMonitor } from '../position-monitor-redux/position-monitor-reducer';
import { formatToUnix } from '~/solution/shared/util/common.util';
import { QueryVehicleTrajectoryArrayListReturn } from '~/solution/model/dto/position-monitor.dto';
import { ShowNotification } from '~/framework/util/common';
declare const AMap: any;
export function usePositionMonitorMapbtnDrivingLineStore(reduxState: TPositionMonitor) {
  const { state, setStateWrap } = useStateStore(new IPositionMonitorMapbtnDrivingLineState());
  const { carSpeedBase, drivingLineData, deviceCode, timeInfo, tableData } = state;
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

  function setEndRunning() {
    setStateWrap({
      isRunning: true,
      carSpeedBase: 1,
      currentPoint: drivingLineData.pointList.length - 1
    });
  }

  function changeSliderProgress(value: number) {
    console.log(value);

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
    console.log(value);

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
      isRunning: isON,
      carSpeedBase: 1
    });
  }

  function onSpeedChangeClick(isFast: boolean) {
    let carSpeedInfo = 0;
    if (isFast) {
      carSpeedInfo = carSpeedBase >= 1 ? carSpeedBase * 2 : 2;
    } else {
      carSpeedInfo = carSpeedBase >= 1 ? 0.5 : carSpeedBase / 2;
    }
    setStateWrap({
      carSpeedBase: carSpeedInfo
    });
  }

  async function onExchangeCoordinates(value: QueryVehicleTrajectoryArrayListReturn) {
    let tanslateLngLat: {} = '';
    const tableDataInfo: any = await Promise.all(
      tableData.map(async item => {
        if (item.coordinates == value.coordinates) {
          if (!tanslateLngLat) {
            tanslateLngLat = await regeoCode(value.coordinates);
          }
          console.log('tanslateLngLat', tanslateLngLat);

          item.coordinates = tanslateLngLat as any;
        }
        return item;
      })
    );
    setStateWrap({
      tableData: tableDataInfo
    });
  }

  function regeoCode(lnglat: Array<number>) {
    let geocoder: any;
    if (!geocoder) {
      geocoder = new AMap.Geocoder({
        city: '全国', //城市设为北京，默认：“全国”
        radius: 1000 //范围，默认：500
      });
    }
    return new Promise((resolve, reject) => {
      geocoder.getAddress(lnglat, async function(status: any, result: any) {
        if (status === 'complete' && result.regeocode) {
          resolve(result.regeocode.formattedAddress);
        } else {
          reject(false);
        }
      });
    });
  }

  function confirmRun() {
    const params = {
      deviceCode,
      beginTime: timeInfo && timeInfo[0] ? formatToUnix(timeInfo[0]) : -1,
      endTime: timeInfo && timeInfo[1] ? formatToUnix(timeInfo[1]) : -1
    };
    setStateWrap({ playbackLoading: true });
    const startTime = new Date().getTime();
    positionMonitorService.queryVehicleHistoryTrajectory(params).subscribe(
      res => {
        console.log('查询轨迹的时间差', new Date().getTime() - startTime);
        const newPointList = [];
        if (res.pointList.length) {
          for (let index = 1; index < res.pointList.length; index++) {
            if (
              JSON.stringify(res.pointList[index - 1].coordinates) !== JSON.stringify(res.pointList[index].coordinates)
            ) {
              res.pointList[index].time = moment(res.pointList[index].time).format('MM/DD HH:mm') as any;
              newPointList.push(res.pointList[index]);
            }
          }
          res.pointList = newPointList;
        } else {
          ShowNotification.info('当前车辆没有行车轨迹');
        }
        setStateWrap({
          drivingLineData: res,
          playbackLoading: false,
          carSpeedBase: 1
        });
      },
      () => {
        setStateWrap({
          playbackLoading: false
        });
      }
    );
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
    onExchangeCoordinates,
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
