import style from './user-action-report.component.less';
import { IUserActionReportState, POINT_NUMBER } from './user-action-report.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef, ChangeEvent, MutableRefObject } from 'react';
import { IMAP } from '~/solution/shared/util/map.util';
import useECharts from '~/framework/aop/hooks/use-echarts';
import { OrderReportService } from '~/solution/model/services/report-order.service';
import { AlarmTypeList } from '~/solution/model/dto/report-order.dto';
import { jsPDF } from 'jspdf';
import Html2canvas from 'html2canvas';
import { useParams } from 'react-router-dom';
import { ShowNotification } from '~/framework/util/common';
declare const AMap: any;
export function useUserActionReportStore() {
  const { state, setStateWrap } = useStateStore(new IUserActionReportState());
  const map: any = useRef();
  const chartRef: any = useRef();
  const containerRef: MutableRefObject<HTMLDivElement> = useRef();
  const tabHeadersRef: MutableRefObject<HTMLDivElement> = useRef();
  const orderReportService: OrderReportService = useService(OrderReportService);
  const { searchKey }: any = useParams();

  useEffect(() => {
    setStateWrap({ deviceCode: searchKey, curDeviceCode: searchKey });
    getCurrentPageData(searchKey);
    if (window.innerWidth <= 750) {
      document.getElementsByTagName('html')[0].style['font-size'] = `${(window.innerWidth / 750) * 15}px`;
    } else {
      document.getElementsByTagName('html')[0].style['font-size'] = `${(window.innerWidth / 2500) * 15}px`;
    }
    initMap('locationMap');
    // bindScrollEvents();
  }, []);

  function bindScrollEvents() {
    const tabStartY = tabHeadersRef.current.clientTop;
    findClosestElement();
    containerRef.current.addEventListener('scroll', () => {
      if (containerRef.current.scrollTop > tabStartY) {
        tabHeadersRef.current.classList.add(style.sticky);
      } else {
        tabHeadersRef.current.classList.remove(style.sticky);
      }
      findClosestElement();
    });
  }

  function findClosestElement() {
    const specialTags: NodeListOf<HTMLDivElement> = document.querySelectorAll('[data-x]');
    let minIndex = 0;
    for (let i = 0; i < specialTags.length; i++) {
      if (
        Math.abs(specialTags[i].offsetTop - containerRef.current.scrollTop) <
        Math.abs(specialTags[minIndex].offsetTop - containerRef.current.scrollTop)
      ) {
        minIndex = i;
      }
    }
    setStateWrap({ currentPoint: minIndex });
  }

  function onValueSearch() {
    setStateWrap({ curDeviceCode: state.deviceCode });
    getCurrentPageData();
  }

  function setCurrentPoint(type: POINT_NUMBER) {
    const specialTags: NodeListOf<HTMLDivElement> = document.querySelectorAll('[data-x]');
    containerRef.current.scrollTo({
      top: specialTags[type].offsetTop - 150,
      behavior: 'smooth'
    });
  }

  function onStateChange(event: ChangeEvent<HTMLInputElement>) {
    setStateWrap({
      deviceCode: event.target.value
    });
  }

  async function printDOM() {
    const canvas = await Html2canvas(document.getElementById('print'), {
      height: document.getElementById('print').scrollHeight, //
      width: document.getElementById('print').scrollWidth //??????????????????????????????????????????????????????????????????
    });
    // ????????????
    const OFFSET_X = 20;
    // ??????????????????
    const OFFSET_Y = 20;
    //a4 ??????
    const A4 = { width: 595.28, height: 841.89 };
    // ??????????????????
    const contentWidth = canvas.width;
    const contentHeight = canvas.height;
    //??????pdf??????html???????????????canvas??????; ??????????????????
    const pageHeight = (contentWidth / A4.width) * A4.height;
    //?????????pdf???html????????????
    let leftHeight = contentHeight;
    let position = 0;
    //a4????????????[595.28,841.89]???html???????????????canvas???pdf??????????????????
    const imgWidth = 555.28;
    const imgHeight = (555.28 / contentWidth) * contentHeight;
    // ??????
    const imageData = canvas.toDataURL('image/jpeg', 1.0);
    const doc = new jsPDF('p', 'pt', 'a4');
    //???????????????????????????????????????html?????????????????????????????????pdf???????????????(841.89)
    //??????????????????pdf????????????????????????????????????
    if (leftHeight < pageHeight) {
      doc.addImage(imageData, 'JPEG', OFFSET_X, OFFSET_Y, imgWidth, imgHeight);
    } else {
      while (leftHeight > 0) {
        doc.addImage(imageData, 'JPEG', OFFSET_X, position + OFFSET_Y, imgWidth, imgHeight);
        leftHeight -= pageHeight;
        position -= A4.height;
        //?????????????????????
        if (leftHeight > 0) {
          doc.addPage();
        }
      }
      doc.save('?????????????????????.pdf');
    }
  }
  function getCurrentPageData(initKey?: string) {
    setStateWrap({
      loading: true
    });
    orderReportService.queryReportTraffic({ strValue: initKey ?? state.deviceCode }).subscribe(
      async res => {
        if (!res.plateNo) {
          setStateWrap({
            loading: false
          });
          // ShowNotification.error('??????????????????');
          return;
        }
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
        // ???????????????????????????????????????

        res.pointPassList =
          res.pointPassList?.length >= 1 &&
          (await Promise.all(
            res.pointPassList?.map(async (item: any) => {
              item.startAddress = (await IMAP.covertPointToAddress([item.startLon, item.startLat])) as any;
              item.endAddress = (await IMAP.covertPointToAddress([item.endLon, item.endLat])) as any;
              return item;
            })
          ));

        res.residentList = await Promise.all(
          res.residentList?.map(async (item: any) => {
            item.address = (await IMAP.covertPointToAddress([item.longitude, item.latitude])) as any;
            return item;
          })
        );

        res.alarmTypeList = await Promise.all(
          res.alarmTypeList?.map(async (item: any) => {
            item.alarmList = await Promise.all(
              item.alarmList.map(async (itemChild: any) => {
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
      },
      () => {
        setStateWrap({
          loading: false
        });
      }
    );
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
  return {
    state,
    handleCancel,
    onShareClick,
    chartRef,
    setCurrentPoint,
    printDOM,
    onStateChange,
    onValueSearch,
    tabHeadersRef,
    containerRef
  };
}
