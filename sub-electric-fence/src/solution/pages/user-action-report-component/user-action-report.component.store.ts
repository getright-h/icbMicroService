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
declare const AMap: any;
export function useUserActionReportStore() {
  const { state, setStateWrap } = useStateStore(new IUserActionReportState());
  const map: any = useRef();
  const chartRef: any = useRef();
  const containerRef: MutableRefObject<HTMLDivElement> = useRef();
  const tabHeadersRef: MutableRefObject<HTMLDivElement> = useRef();
  const orderReportService: OrderReportService = useService(OrderReportService);

  useEffect(() => {
    getCurrentPageData();
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
      width: document.getElementById('print').scrollWidth //为了使横向滚动条的内容全部展示，这里必须指定
    });
    // 上下边距
    const OFFSET_X = 20;
    // 上下左右边距
    const OFFSET_Y = 20;
    //a4 尺寸
    const A4 = { width: 595.28, height: 841.89 };
    // 生成页面尺寸
    const contentWidth = canvas.width;
    const contentHeight = canvas.height;
    //一页pdf显示html页面生成的canvas高度; 根据宽的比例
    const pageHeight = (contentWidth / A4.width) * A4.height;
    //未生成pdf的html页面高度
    let leftHeight = contentHeight;
    let position = 0;
    //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
    const imgWidth = 555.28;
    const imgHeight = (555.28 / contentWidth) * contentHeight;
    // 图片
    const imageData = canvas.toDataURL('image/jpeg', 1.0);
    const doc = new jsPDF('p', 'pt', 'a4');
    //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
    //当内容未超过pdf一页显示的范围，无需分页
    if (leftHeight < pageHeight) {
      doc.addImage(imageData, 'JPEG', OFFSET_X, OFFSET_Y, imgWidth, imgHeight);
    } else {
      while (leftHeight > 0) {
        doc.addImage(imageData, 'JPEG', OFFSET_X, position + OFFSET_Y, imgWidth, imgHeight);
        leftHeight -= pageHeight;
        position -= A4.height;
        //避免添加空白页
        if (leftHeight > 0) {
          doc.addPage();
        }
      }
      doc.save('用户行为分析表.pdf');
    }
  }
  function getCurrentPageData() {
    setStateWrap({
      loading: true
    });
    orderReportService.queryReportTraffic({ strValue: state.deviceCode }).subscribe(async res => {
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
