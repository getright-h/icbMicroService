import { geoCoordMap, gradients, IDataScreenState } from './data-screen.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef } from 'react';
import useECharts from '~/framework/aop/hooks/use-echarts';
import * as echarts from 'echarts';
import geoJson from '~assets/library/china_full.json';

export function useDataScreenStore() {
  const { state, setStateWrap } = useStateStore(new IDataScreenState());
  const areaStatRef = useRef();
  const totalCarRef = useRef();
  const alarmStatRef = useRef();
  const offlineStatRef = useRef();
  const monitorStatRef = useRef();
  const mileageStatRef = useRef();

  function changeFullScreen() {
    setStateWrap({ isFull: !state.isFull });
  }

  // 地图区域数据
  useECharts(areaStatRef, getAreaStatOption());
  function getAreaStatOption(): {} {
    function convertData(data: any[]) {
      return data.map(d => {
        const geoCoord = geoCoordMap[d.name];
        if (geoCoord) {
          return {
            name: d.name,
            value: geoCoord.concat(d.value)
          };
        }
      });
    }
    function lineData(data: any[]) {
      return data.map(d => {
        return { coords: [geoCoordMap['0'], geoCoordMap[d.name]] };
      });
    }
    const datas = [
      { name: '四川省', value: 10 },
      { name: '北京市', value: 30 },
      { name: '江苏省', value: 20 }
    ];
    echarts.registerMap('china', geoJson);
    return {
      geo: {
        type: 'map',
        map: 'china',
        layoutCenter: ['50%', '70%'],
        layoutSize: '130%',
        itemStyle: {
          areaColor: '#3B4E95',
          borderColor: 'rgba(255,255,255,0.3)'
        },
        // emphasis: {
        //   label: {
        //     show: false
        //   }
        // },
        tooltip: {
          show: false
        }
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          symbolSize: 8,
          rippleEffect: {
            brushType: 'stroke',
            scale: 3
          },
          itemStyle: {
            color: '#fff'
          },
          data: convertData(datas),
          tooltip: {
            formatter: (data: any) => {
              return `${data.name}：${data.value[2]}`;
            },
            show: true,
            backgroundColor: 'rgba(33,33,33,0.6)',
            borderWidth: 0,
            padding: [10, 12],
            textStyle: {
              fontSize: 12,
              color: '#fff'
            }
          }
        },
        {
          type: 'lines',
          coordinateSystem: 'geo',
          effect: {
            show: true,
            trailLength: 0,
            symbol: 'path://M8,0L16,30L8,24L0,30L8,0Z',
            color: '#BAC2E0',
            symbolSize: 12
          },
          lineStyle: {
            width: 2,
            type: 'dashed',
            curveness: 0.1,
            color: '#7885B8'
          },
          data: lineData(datas)
        }
      ]
    };
  }

  // 平台车辆总览
  useECharts(totalCarRef, getTotalCarOption());
  function getTotalCarOption(): {} {
    function formatTotalCar(datas: any[]) {
      let sum = 0;
      let res = '';
      datas.forEach((d, i) => {
        sum += d.value;
        res += datas[i].seriesName.slice(-3) + '：' + d.value + '辆<br/>';
      });
      return '车辆总数：' + sum + '辆<br/>' + res;
    }
    return {
      ...createBarOptions(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], formatTotalCar),
      title: {
        text: '绑定车辆统计',
        left: '3%',
        top: '10',
        textStyle: {
          fontSize: 14,
          height: 20,
          color: '#FFFFFF'
        }
      },
      legend: {
        top: '10',
        right: '4%',
        textStyle: {
          color: 'rgba(255,255,255,0.7)'
        }
      },
      series: [
        {
          name: '车辆已绑定',
          type: 'bar',
          stack: 'total',
          barWidth: '14',
          itemStyle: {
            color: gradients.purple
          },
          data: [3200, 3020, 3010, 3340, 3900]
        },
        {
          name: '车辆未绑定',
          type: 'bar',
          stack: 'total',
          barWidth: '14',
          itemStyle: {
            color: gradients.orange
          },
          data: [1200, 1320, 1010, 1340, 900]
        }
      ]
    };
  }

  // 报警数据统计
  useECharts(alarmStatRef, getAlarmStatOption());
  function getAlarmStatOption(): {} {
    const datas = [
      { value: 35, name: '碰撞报警' },
      { value: 20, name: '震动报警' },
      { value: 10, name: '超速报警' },
      { value: 35, name: '行驶报警' }
    ];
    return createPieOptions(datas, {
      name: '报警数据统计',
      radius: ['50%', '75%'],
      startAngle: 60,
      data: datas
    });
  }

  // 报警跟进统计

  // 离线车辆统计
  useECharts(offlineStatRef, getOfflineStatOption());
  function getOfflineStatOption(): {} {
    const datas = [
      { value: 35, name: '一天' },
      { value: 20, name: '三天' },
      { value: 10, name: '七天' },
      { value: 35, name: '一个月以上' }
    ];
    return createPieOptions(datas, {
      name: '离线车辆统计',
      radius: [1, '75%'],
      startAngle: 180,
      data: datas
    });
  }

  // 监控组报警统计
  useECharts(monitorStatRef, getMonitorOption());
  function getMonitorOption(): {} {
    return {
      ...createBarOptions(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']),
      series: [
        {
          // name: '车辆已绑定',
          type: 'bar',
          stack: 'total',
          barWidth: '14',
          itemStyle: {
            color: gradients.red
          },
          data: [3200, 3020, 3010, 3340, 3900]
        }
      ]
    };
  }

  // 车辆里程统计
  useECharts(mileageStatRef, getMileageStatOption());
  function getMileageStatOption(): {} {
    const datas = [
      { value: 35, name: '0-1W公里' },
      { value: 20, name: '1W-5W公里' },
      { value: 10, name: '5W-10W公里' },
      { value: 35, name: '10W公里以上' }
    ];
    return createPieOptions(datas, {
      name: '车辆里程统计',
      radius: [1, '75%'],
      startAngle: 180,
      data: datas
    });
  }

  // 图表公共参数
  function createBarOptions(xLabels: string[], tipFormat?: Function) {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'none'
        },
        backgroundColor: 'rgba(33,33,33,0.6)',
        borderWidth: 0,
        padding: [10, 12],
        textStyle: {
          fontSize: 12,
          color: '#fff'
        },
        formatter: (datas: any) => (tipFormat ? tipFormat(datas) : null)
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        axisLine: {
          lineStyle: {
            color: '#00D2FF'
          }
        },
        axisTick: { show: false },
        axisLabel: {
          color: '#709FD9'
        },
        data: xLabels
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#00D2FF'
          }
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          color: '#709FD9'
        }
      }
    };
  }

  function formatAlarmLegend(v: any, datas: any[]) {
    let index = 0;
    datas.forEach(function(d: any, i: number) {
      if (d.name == v) {
        index = i;
        return;
      }
    });
    return [`{a|${v}}`, `{b|${datas[index].value}%}`].join('');
  }

  function createPieOptions(datas: any[], customSeries: {}) {
    return {
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'none'
        },
        formatter: '{b}：{c}%',
        backgroundColor: 'rgba(33,33,33,0.6)',
        borderWidth: 0,
        padding: [10, 12],
        textStyle: {
          fontSize: 12,
          color: '#fff'
        }
      },
      legend: {
        icon: 'rect',
        itemWidth: 15,
        itemHeight: 15,
        orient: 'vertical',
        left: '3%',
        top: '8%',
        itemGap: 16,
        formatter: (v: any) => formatAlarmLegend(v, datas),
        textStyle: {
          rich: {
            a: {
              color: '#fff',
              padding: [3, 10, 0, 0]
            },
            b: {
              color: '#FAAD37',
              padding: [3, 0, 0, 0]
            }
          }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      color: [gradients.orange, gradients.purple, gradients.red, gradients.blue],
      series: [
        {
          ...customSeries,
          type: 'pie',
          left: '10%',
          avoidLabelOverlap: false,
          label: { show: false },
          labelLine: { show: false },
          itemStyle: {
            borderRadius: 4,
            borderColor: '#0A0B3F',
            borderWidth: 6
          },
          emphasis: {
            scaleSize: 12
          }
        }
      ]
    };
  }

  /** temp */
  useEffect(() => {
    setTimeout(() => {
      setStateWrap({ num: getRandomNumber(0, 1000000) });
    }, 10000);
  }, []);

  function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  /** temp */

  return {
    state,
    areaStatRef,
    totalCarRef,
    alarmStatRef,
    offlineStatRef,
    monitorStatRef,
    mileageStatRef,
    changeFullScreen
  };
}
