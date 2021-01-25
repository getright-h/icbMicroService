import { IUserActionReportState, POINT_NUMBER } from './user-action-report.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef, ChangeEvent } from 'react';
import { IMAP } from '~/solution/shared/util/map.util';
import useECharts from '~/framework/aop/hooks/use-echarts';
import { OrderReportService } from '~/solution/model/services/report-order.service';
import { AlarmTypeList } from '~/solution/model/dto/report-order.dto';
declare const AMap: any;
export function useUserActionReportStore() {
  const { state, setStateWrap } = useStateStore(new IUserActionReportState());
  const map: any = useRef();
  const chartRef: any = useRef();
  const orderReportService: OrderReportService = useService(OrderReportService);
  useEffect(() => {
    getCurrentPageData();
    if (window.innerWidth <= 750) {
      document.getElementsByTagName('html')[0].style['font-size'] = `${(window.innerWidth / 750) * 15}px`;
    } else {
      document.getElementsByTagName('html')[0].style['font-size'] = `${(window.innerWidth / 2500) * 15}px`;
    }
    initMap('locationMap');
  }, []);

  function onValueSearch() {
    getCurrentPageData();
  }

  function setCurrentPoint(type: POINT_NUMBER) {
    setStateWrap({
      currentPoint: type
    });
  }

  function onStateChange(event: ChangeEvent<HTMLInputElement>) {
    setStateWrap({
      deviceCode: event.target.value
    });
  }

  function printDOM() {
    // 获取body的全部内容并保存到一个变量中
    const bodyHtml = window.document.body.innerHTML;

    // // 通过截取字符串的方法获取所需要打印的内容
    // const printStart = '<!--startpart-->';
    // const printEnd = '<!--endpart-->';

    // const printHtmlStart = bodyHtml.slice(bodyHtml.indexOf(printStart));
    // const printHtml = printHtmlStart.slice(0, printHtmlStart.indexOf(printEnd));

    // 将截取后打印内容 替换掉 body里的内容
    window.document.body.innerHTML = bodyHtml;

    // 打印操作
    window.print();

    // 打印完成之后再恢复body的原始内容
    window.document.body.innerHTML = bodyHtml;
  }

  function getCurrentPageData() {
    setStateWrap({
      loading: true
    });
    orderReportService.queryReportTraffic({ strValue: 'LSGUL83L3HA117031' }).subscribe(async res => {
      setStateWrap({
        actionData: res,
        loading: false
      });
      if (res.longitude) {
        new AMap.Marker({
          map: map.current,
          position: [res.longitude, res.latitude]
        });
        map.current.setCenter([res.longitude, res.latitude]);
      }

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

      res.residentList = await Promise.all(
        res.residentList?.map(async item => {
          item.address = (await IMAP.covertPointToAddress([item.longitude, item.latitude])) as any;
          return item;
        })
      );

      res.alarmTypeList = await Promise.all(
        res.alarmTypeList?.map(async item => {
          item.alarmList = await Promise.all(
            item.alarmList.map(async itemChild => {
              itemChild.address = (await IMAP.covertPointToAddress([itemChild.longitude, itemChild.latitude])) as any;
              return itemChild;
            })
          );

          return item;
        })
      );

      setStateWrap({
        actionData: res
      });
    });
  }

  function handleCancel() {
    setStateWrap({
      isModalVisible: false
    });
  }

  useECharts(chartRef, getAlarmStatisticOption(state.actionData?.alarmTypeList));

  function initMap(mapId: string) {
    map.current = IMAP.createMap(mapId);
  }

  function getAlarmStatisticOption(alarmStatisticsConst: AlarmTypeList[] = []): {} {
    const values: Array<{ value: number; name: string }> = [];
    alarmStatisticsConst.map(item => {
      values.push({ value: item.alarmTypeCount, name: item.alarmTypeText });
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

  function onShareClick() {
    setStateWrap({ isModalVisible: true });
  }
  return { state, handleCancel, onShareClick, chartRef, setCurrentPoint, printDOM, onStateChange, onValueSearch };
}
