import { alarmStatisticsConst, IUserActionReportState } from './user-action-report.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef } from 'react';
import { IMAP } from '~/solution/shared/util/map.util';
import useECharts from '~/framework/aop/hooks/use-echarts';
import { OrderReportService } from '~/solution/model/services/report-order.service';
declare const AMap: any;
export function useUserActionReportStore() {
  const { state, setStateWrap } = useStateStore(new IUserActionReportState());
  const map: any = useRef();
  const chartRef: any = useRef();
  const orderReportService: OrderReportService = useService(OrderReportService);
  useEffect(() => {
    if (window.innerWidth <= 750) {
      document.getElementsByTagName('html')[0].style['font-size'] = `${(window.innerWidth / 750) * 15}px`;
    } else {
      document.getElementsByTagName('html')[0].style['font-size'] = `${(window.innerWidth / 2500) * 15}px`;
    }

    getCurrentPageData();
    initMap('locationMap');
  }, []);

  function getCurrentPageData() {
    orderReportService.queryReportTraffic({ strValue: 'LSGUL83L3HA117031' }).subscribe(async res => {
      if (res.longitude) {
        new AMap.Marker({
          map: map.current,
          position: [res.longitude, res.latitude]
        });
        map.current.setCenter([res.longitude, res.latitude]);
      }

      setStateWrap({
        actionData: res
      });

      // 这个时候异步去进行地址转换

      res.pointPassList =
        res.pointPassList?.length > 1 &&
        (await Promise.all(
          res.pointPassList?.map(async item => {
            item.startAddress = (await IMAP.covertPointToAddress([item.startLon, item.startLat])) as any;
            item.endAddress = (await IMAP.covertPointToAddress([item.endLon, item.endLat])) as any;
            return item;
          })
        ));

      setStateWrap({
        actionData: res
      });

      res.residentList = await Promise.all(
        res.residentList?.map(async item => {
          item.address = (await IMAP.covertPointToAddress([item.longitude, item.latitude])) as any;
          return item;
        })
      );

      setStateWrap({
        actionData: res
      });
    });
  }

  useECharts(chartRef, getAlarmStatisticOption());

  function initMap(mapId: string) {
    map.current = IMAP.createMap(mapId);
  }

  function getAlarmStatisticOption(): {} {
    const values: Array<{ value: number; name: string }> = [];
    alarmStatisticsConst.map(item => {
      values.push({ value: item.count, name: item.type });
    });
    const option = {
      color: [
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: '#7A27FF'
            },
            {
              offset: 1,
              color: '#B947FF'
            }
          ]
        },
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: '#FF6A2F'
            },
            {
              offset: 1,
              color: '#FF9B19'
            }
          ]
        },
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: '#5058FF'
            },
            {
              offset: 1,
              color: '#00AEFF'
            }
          ]
        }
      ],
      series: [
        {
          type: 'pie',
          radius: ['50%', '70%'],
          startAngle: 75,
          selectedMode: 'single',
          selectedOffset: 5,
          clockwise: false,
          label: {
            show: true,
            position: 'outside',
            color: '#909399',
            fontSize: '1.6rem'
          },
          labelLine: {
            show: false
          },
          emphasis: {
            label: {
              color: '#606266',
              fontSize: '2rem'
            },
            labelLine: {
              show: true,
              lineStyle: {
                color: '#999999'
              }
            }
          },
          data: values
        }
      ]
    };
    return option;
  }
  return { state, chartRef };
}
