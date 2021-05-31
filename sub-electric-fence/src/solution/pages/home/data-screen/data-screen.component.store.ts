import { geoCoordMap, gradients, IDataScreenState } from './data-screen.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef } from 'react';
import useECharts from '~/framework/aop/hooks/use-echarts';
import * as echarts from 'echarts';
import geoJson from '~assets/library/china_full.json';
import { DataScreenService } from '~/solution/model/services/data-screen.service';
import moment from 'moment';

export function useDataScreenStore() {
  const { state, setStateWrap, getState } = useStateStore(new IDataScreenState());
  const dataService: DataScreenService = new DataScreenService();
  const areaStatRef = useRef();
  const totalCarRef = useRef();
  const alarmStatRef = useRef();
  const offlineStatRef = useRef();
  const monitorStatRef = useRef();
  const mileageStatRef = useRef();

  // useEffect(() => {
  //   getFenceStat();
  //   getTotalStat();
  //   getGpsStat();
  // const alarmForm: AlarmStatRequest = {
  //   organizationIds: state.organizationId && [state.organizationId],
  //   alarmTypeTimeRange: formatTime('day'),
  //   alarmFollowTimeRange: formatTime('day'),
  //   groupAlarmTimeRange: formatTime('day')
  // };
  // setStateWrap({ alarmForm });

  //   getAlarmStat();
  // }, []);

  useEffect(() => {
    getFenceStat();
    getTotalStat();
    getAlarmStat();
    getGpsStat();
  }, [state.organizationId]);

  // fetch data
  function getFenceStat() {
    dataService.getFenceStat(state.organizationId && [state.organizationId]).subscribe(res => {
      setStateWrap({ ...res });
    });
  }

  function getTotalStat() {
    dataService.getTotalStat(state.organizationId && [state.organizationId]).subscribe(res => {
      setStateWrap({ ...res });
    });
  }

  function getAlarmStat() {
    const { alarmForm } = state;
    dataService
      .getAlarmStat({ ...alarmForm, organizationIds: state.organizationId && [state.organizationId] })
      .subscribe(res => {
        setStateWrap({ ...res });
      });
  }

  function getGpsStat() {
    const mielageParam = [
      { min: 0, max: 10000 },
      { min: 10000, max: 50000 },
      { min: 50000, max: 100000 },
      { min: 100000, max: 0 }
    ];
    const offlineTimeStamps = [
      moment()
        .subtract(1, 'd')
        .valueOf(),
      moment()
        .subtract(3, 'd')
        .valueOf(),
      moment()
        .subtract(7, 'd')
        .valueOf(),
      moment()
        .subtract(1, 'M')
        .valueOf()
    ];
    dataService
      .getGpsStat({
        organizationIds: state.organizationId && [state.organizationId],
        mielageParam,
        offlineTimeStamps
      })
      .subscribe(res => {
        setStateWrap({ ...res });
      });
  }

  //handle change
  function orgSelectChange(v: string) {
    setStateWrap({ organizationId: v });
  }

  function changeTimeRange(type: string, rangeType: string) {
    setStateWrap({
      alarmForm: {
        ...state.alarmForm,
        [type]: formatTime(rangeType)
      }
    });
  }

  function changeFullScreen() {
    setStateWrap({ isFull: !state.isFull });
  }

  // 地图区域数据
  useECharts(areaStatRef, getAreaStatOption());
  function getAreaStatOption(): {} {
    const { vehicleStatus } = state;
    const datas = vehicleStatus.data.map(d => {
      return { name: d.province, value: d.onlineCount };
    });
    function convertData(datas: { name: string; value: number }[]) {
      return datas.map(d => {
        const geoCoord = geoCoordMap[d.name];
        if (geoCoord) {
          return {
            name: d.name,
            value: geoCoord.concat(d.value)
          };
        }
      });
    }
    function lineData(datas: { name: string; value: number }[]) {
      return datas.map(d => {
        if (!geoCoordMap[d.name]) {
          return { coords: [geoCoordMap['0'], geoCoordMap['0']] };
        }
        return { coords: [geoCoordMap['0'], geoCoordMap[d.name]] };
      });
    }
    echarts.registerMap('china', geoJson);
    return {
      geo: {
        type: 'map',
        map: 'china',
        layoutCenter: ['50%', '70%'],
        layoutSize: '130%'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          type: 'map',
          map: 'china',
          zlevel: 1,
          layoutCenter: ['50%', '70%'],
          layoutSize: '130%',
          itemStyle: {
            areaColor: '#3B4E95',
            borderColor: 'rgba(255,255,255,0.3)'
          },
          emphasis: {
            itemStyle: {
              areaColor: '#929FD1',
              borderColor: 'rgba(255,255,255,0.3)'
            },
            label: {
              show: false
            }
          },
          data: datas,
          tooltip: {
            formatter: (data: any) => {
              return `${data.name}：${data?.value || 0}`;
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
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 3,
          symbolSize: 5,
          rippleEffect: {
            brushType: 'stroke',
            scale: 4
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
          zlevel: 2,
          effect: {
            show: true,
            constantSpeed: 50,
            trailLength: 0.2,
            symbol: 'path://M4,0L8,40L4,30L0,40L4,0Z',
            color: '#BAC2E0',
            symbolSize: 4
          },
          lineStyle: {
            width: 1,
            curveness: 0.2,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#0A0B3F'
                },
                {
                  offset: 1,
                  color: '#929FD1'
                }
              ]
            }
          },
          tooltip: {
            show: false
          },
          data: lineData(datas)
        }
      ]
    };
  }

  // 平台车辆总览
  useECharts(totalCarRef, getTotalCarOption());
  function getTotalCarOption(): {} {
    const { vehicleBinds } = state;
    const sortData = vehicleBinds.sort((a, b) => b.total - a.total);
    const labels = sortData.map(v => v.organizationName);
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
      ...createBarOptions(labels, formatTotalCar),
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
          data: sortData.map(v => v.anZhuang)
        },
        {
          name: '车辆未绑定',
          type: 'bar',
          stack: 'total',
          barWidth: '14',
          itemStyle: {
            color: gradients.orange
          },
          data: sortData.map(v => v.unAnZhuang)
        }
      ]
    };
  }

  // 报警数据统计
  useECharts(alarmStatRef, getAlarmStatOption());
  function getAlarmStatOption(): {} {
    const { alarmTypeStatistics } = state;
    const sum = alarmTypeStatistics.reduce((total, a) => (total += a.count), 0);
    const datas = alarmTypeStatistics.map(d => {
      return { name: d.alarmTypeText || '', value: d.count, percent: ((d.count / sum) * 100).toFixed(2) || 0 };
    });
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
    const { offline } = state;
    const datas = ['一天', '三天', '七天', '一个月以上'].map((n, i) => {
      return { name: n, value: offline.offline[i] ? offline.offline[i].count : 0 };
    });
    return createPieOptions(datas, {
      name: '离线车辆统计',
      radius: [0, '75%'],
      startAngle: 180,
      data: datas
    });
  }

  // 监控组报警统计
  useECharts(monitorStatRef, getMonitorOption());
  function getMonitorOption(): {} {
    const { groupAlarmStatistic } = state;
    const formatData = groupAlarmStatistic.sort((a, b) => b.total - a.total);
    const labels = formatData.map(d => d.groupName);
    function formatAlarmCount(datas: any[]) {
      let sum = 0;
      let res = '';
      const list = formatData.find(d => d.groupName == datas[0].axisValue);
      if (list) {
        list.data.forEach(o => {
          sum += o.count;
          res += `${o.alarmTypeText}报警：${o.count}<br/>`;
        });
      }
      return '报警总数：' + sum + '<br/>' + res;
    }
    return {
      ...createBarOptions(labels, formatAlarmCount),
      series: [
        {
          type: 'bar',
          stack: 'total',
          barWidth: '14',
          itemStyle: {
            color: gradients.red
          },
          data: formatData.map(d => d.total)
        }
      ]
    };
  }

  // 车辆里程统计
  useECharts(mileageStatRef, getMileageStatOption());
  function getMileageStatOption(): {} {
    const { mileage } = state;
    const datas = ['0-1W公里', '1W-5W公里', '5W-10W公里', '10W公里以上'].map((n, i) => {
      return { name: n, value: mileage.mileage[i] ? mileage.mileage[i].count : 0 };
    });
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
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: xLabels.length > 5 ? (5 / xLabels.length) * 100 : 100,
          minValueSpan: 4,
          maxValueSpan: 7
        }
      ],
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
          interval: 0,
          width: 64,
          color: '#709FD9',
          overflow: 'truncate'
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
    let sum = 0;
    datas.forEach(function(d: any, i: number) {
      sum += d.value;
      if (d.name == v) {
        index = i;
        return;
      }
    });
    return [`{a|${v}}`, `{b|${((datas[index]?.value / sum) * 100).toFixed(2)}%}`].join('');
  }

  function createPieOptions(datas: any[], customSeries: {}) {
    return {
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'none'
        },
        formatter: '{b}：{d}% {c}',
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
            borderColor: '#0A0B3F',
            borderWidth: 4
          },
          emphasis: {
            scaleSize: 12
          }
        }
      ]
    };
  }

  // util
  function formatTime(type: string) {
    switch (type) {
      case 'day':
        return {
          start: moment()
            .startOf('day')
            .valueOf(),
          end: moment().valueOf()
        };
      case 'week':
        return {
          start: moment()
            .startOf('isoWeek')
            .valueOf(),
          end: moment().valueOf()
        };
      case 'month':
        return {
          start: moment()
            .startOf('month')
            .valueOf(),
          end: moment().valueOf()
        };
      default:
        return undefined;
    }
  }

  return {
    state,
    areaStatRef,
    totalCarRef,
    alarmStatRef,
    offlineStatRef,
    monitorStatRef,
    mileageStatRef,
    changeFullScreen,
    orgSelectChange
  };
}
