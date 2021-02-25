import { IIMapState, TIMapProps } from './i-map.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef, useImperativeHandle } from 'react';
import * as _ from 'lodash';
import { IMAP } from '~/solution/shared/util/map.util';
import { message } from 'antd';
import { PointList } from '../../../model/dto/position-monitor.dto';
import { REPORT_UTIL } from '~/solution/shared/util/report-manage.util';
declare const AMap: any;

const autoOptions = {
  city: '全国'
};
const autoComplete = new AMap.Autocomplete(autoOptions);
export function useIMapStore(mapProps: TIMapProps) {
  const { state, setStateWrap } = useStateStore(new IIMapState());
  const map: any = useRef();
  // 寻找地址打的marker
  const searchMarker = useRef();
  // 追踪的car的marker
  const carLineMarkerInfo: any = useRef();
  // 追踪的car的polyline
  const polyline = useRef();
  const mouseTool: any = useRef();
  const trafficLayer: any = useRef({});
  const isVisibleTrafficLayer = useRef(false);
  const satelliteCurrent: any = useRef();
  const roadNet: any = useRef();
  const isMouseToolVisible = useRef(false);
  const isVisibleSatellite = useRef(false);
  const isVisibleLocationCar = useRef(false);
  const locationCarMarkerListFlag = useRef([]);
  // 轨迹
  const notPassedArr = useRef([]);
  const havePassedArr = useRef([]);
  const currentAllPoints = useRef([]);
  const currentAllPointsDetailArr = useRef([]);
  const infoWindowInfo: any = useRef();
  const finishedRun = useRef(false);
  const stopPointMarkers = useRef({});
  const stopPointsRef = useRef([]);
  // 常驻点
  const circleMarkers = useRef([]);
  const {
    currentSelectCar,
    setEndRunning,
    locationCarMarkerList,
    runCurrentPoint,
    controllerDirectiveModal,
    isRunning,
    carSpeed,
    currentPoint,
    needRunDrivingLine = true,
    permanentPlaceList,
    isShowStopMarkers
  } = mapProps;
  useEffect(() => {
    initMap(mapProps.needBaseController);
  }, []);

  // 单个车选中，需要获取常驻地点
  useEffect(() => {
    // 清除当前常驻点
    circleMarkers.current.length && map.current.remove(circleMarkers.current);
    if (currentSelectCar) {
      renderMarker([currentSelectCar]);
      currentSelectCar.permanentPlaceList.length && setPermanentPlaceList(currentSelectCar.permanentPlaceList);
      // 需要添加常驻地点
      // 多个车不用获取常驻地点
    } else if (locationCarMarkerList) {
      // 比对
      renderMarker(locationCarMarkerList);
    }
  }, [locationCarMarkerList, currentSelectCar]);

  // 专门用来设置常驻点
  useEffect(() => {
    permanentPlaceList && setPermanentPlaceList(permanentPlaceList);
  }, [permanentPlaceList]);

  //实时追踪的car,car会在最后一个点停下来
  useEffect(() => {
    if (mapProps.carLine) {
      if (carLineMarkerInfo.current) {
        map.current.remove(carLineMarkerInfo.current);
      }
      if (polyline.current) {
        map.current.remove(polyline.current);
      }
      const { plateNo, pointList, coordinates } = mapProps.carLine;
      const carLine: Array<number[]> = [];
      pointList.push({ coordinates } as any);
      pointList?.forEach(item => {
        const coordinatesExchange = IMAP.initLonlat(item.coordinates[0], item.coordinates[1]);
        carLine.push(coordinatesExchange);
      });
      polyline.current = IMAP.drawLine(map.current, carLine);
      const position = carLine[carLine.length - 1];

      carLineMarkerInfo.current = new AMap.Marker({
        map: map.current,
        position: position,
        label: {
          content: `<div>${plateNo}</div>`,
          offset: new AMap.Pixel(-20, 26)
        },
        icon: 'https://webapi.amap.com/images/car.png',
        offset: new AMap.Pixel(-26, -13),
        autoRotation: true
      });
      // 第三个参数是在窗口需要展示的当前车辆的信息
      IMAP.showCarInfo(mapProps.carLine, map.current, { position }, openInfoWinCar);
      map.current.setCenter(position);
    }
  }, [mapProps.carLine?.pointList?.length]);

  /**
   * // 轨迹回放
   * 包含暂停开始速度切换功能，停留点标记
   */
  useEffect(() => {
    //drivingLineData 轨迹回放的点
    // 发生变化重新绘制播放
    map.current.clearMap();
    if (mapProps.drivingLineData?.pointList?.length) {
      const { pointList, stopPoints } = mapProps.drivingLineData;
      currentAllPointsDetailArr.current = pointList;
      const carLine = pointList.map(item => {
        return item.coordinates;
      });
      polyline.current = IMAP.drawLine(map.current, carLine);
      stopPointsRef.current = stopPoints;
      stopPointMarkers.current = IMAP.bindCommonMarkers(stopPoints, map.current);
      map.current.setFitView();
      needRunDrivingLine && runCarUtil(carLine);
    }
  }, [mapProps.drivingLineData]);

  useEffect(() => {
    if (isShowStopMarkers && stopPointsRef.current?.length) {
      stopPointMarkers.current = IMAP.bindCommonMarkers(stopPointsRef.current, map.current);
    } else {
      cleanStopPointMarkers();
    }
  }, [isShowStopMarkers]);

  /**
   *  清除当前停止的停留点
   */
  function cleanStopPointMarkers() {
    map.current.remove(stopPointMarkers.current);
  }
  /**
   * 轨迹上让车动起来的方法
   * @param {any[]} carLine 轨迹线的经纬度
   */
  function runCarUtil(carLine: any[]) {
    carLineMarkerInfo.current = new AMap.Marker({
      map: map.current,
      label: {
        content: `<div>${mapProps.drivingLineData.plateNo}</div>`,
        offset: new AMap.Pixel(-20, 26)
      },
      icon: 'https://webapi.amap.com/images/car.png',
      offset: new AMap.Pixel(-26, -13),
      autoRotation: true
    });

    // 第三个参数是在窗口需要展示的当前车辆的信息
    carLineMarkerInfo.current.on('moving', function(e: any) {
      havePassedArr.current = e.passedPath;

      const newPosition = e.passedPath[e.passedPath.length - 2];
      let currentIndex = 0;

      carLine.forEach((item, index) => {
        // 这里计算剩下的点，便于后面去转换速度
        if (JSON.stringify(item) == JSON.stringify(newPosition)) {
          currentIndex = index;
        }
      });

      runCurrentPoint(currentIndex);

      currentAllPoints.current = carLine;
      if (carLine[carLine.length - 1] == e.passedPath[e.passedPath.length - 1]) {
        currentIndex = carLine.length - 1;
        // 通知父组件这边跑完了
        setEndRunning();
        finishedRun.current = true;
      }
      notPassedArr.current = [e.passedPath[e.passedPath.length - 1], ...carLine.slice(currentIndex + 1)];
    });

    carLineMarkerInfo.current.moveAlong(carLine, 200);
    map.current.setCenter(carLine[0]);
  }

  // 切换轨迹回放车的状态
  useEffect(() => {
    if (carLineMarkerInfo.current) {
      if (isRunning) {
        // 暂停显示当前车辆信息
        carLineMarkerInfo.current.pauseMove();
        const position = havePassedArr.current[havePassedArr.current.length - 1];
        let nextPosition: { lng: number; lat: number } = { lng: 0, lat: 0 },
          satellitesNum = 0,
          time = 0;
        const pointList = mapProps.drivingLineData.pointList;
        if (havePassedArr.current.length > 1) {
          nextPosition = havePassedArr.current[havePassedArr.current.length - 2];
          pointList.map(item => {
            if (item.coordinates[0] == nextPosition.lng) {
              satellitesNum = item.satellitesNum;
              time = item.time;
            }
          });
        } else {
          console.log('pointList[pointList.length - 1]', pointList[pointList.length - 1]);

          satellitesNum = pointList[pointList.length - 1].satellitesNum;
          time = pointList[pointList.length - 1].time;
        }
        IMAP.showCarInfo(mapProps.drivingLineData, map.current, { position, satellitesNum, time }, openInfoWinCar);
      } else {
        if (infoWindowInfo.current) {
          infoWindowInfo.current.close();
        }
        if (finishedRun.current) {
          finishedRun.current = false;
          // 重新跑现在的车辆
          carLineMarkerInfo.current.moveAlong(currentAllPoints.current, 200);
        } else {
          carLineMarkerInfo.current.resumeMove();
        }
      }
    }
  }, [isRunning]);

  // 车当前的运行速度
  useEffect(() => {
    console.log(currentAllPoints.current);
    console.log(currentAllPointsDetailArr.current);

    if (currentAllPoints.current.length) {
      notPassedArr.current = [...currentAllPoints.current.slice(currentPoint)];
    }
    if (carLineMarkerInfo.current) {
      // 切换速度，看下现在的点跑到哪里了，然后截断现在的点的位置，继续跑
      carLineMarkerInfo.current.moveAlong(notPassedArr.current, 200 * carSpeed);
    }
    if (isRunning) {
      carLineMarkerInfo?.current?.pauseMove();
      const position = notPassedArr.current[0];
      let satellitesNum = 0,
        time = 0;
      if (currentAllPointsDetailArr.current) {
        currentAllPointsDetailArr.current.forEach(item => {
          console.log(item.coordinates, [position.lng + '', position.lat + '']);

          if (item.coordinates.toString() == [position.lng + '', position.lat + ''].toString()) {
            satellitesNum = item.satellitesNum;
            time = item.time;
          }
        });
      }
      IMAP.showCarInfo(mapProps.drivingLineData, map.current, { position, satellitesNum, time }, openInfoWinCar);
      // IMAP.showCarInfo(mapProps.drivingLineData, map.current, { position }, openInfoWinCar);
    }
  }, [currentPoint, carSpeed]);

  // 批量标记车辆 大批量车辆打点专用
  async function renderMarker(data: any) {
    const markersInfo: any = [];
    data?.forEach((element: any) => {
      //  描定位点，在传入钱转化成格式
      // 确定当前使用的是哪个设备
      let currentMarker = element.deviceList[0];
      if (data.length == 1 && mapProps.currentSelectCar) {
        // 说明当前的点是被选中的， 所以可以筛选其中选中的设备

        for (const item of element.deviceList) {
          if (item.isDefault) {
            currentMarker = item;
            break;
          }
        }
      }
      if (currentMarker && currentMarker.coordinates) {
        markersInfo.push({
          position: currentMarker.coordinates,
          icon: currentMarker.isOnline ? require('~assets/image/offline.png') : require('~assets/image/online.png'),
          markerInfo: element,
          deviceInfo: currentMarker,
          status: currentMarker.isOnline
        });
      }
    });

    //开始画车走起
    locationCarMarkerListFlag.current = await IMAP.bindMarkerClick(
      markersInfo,
      map.current,
      openInfoWin,
      locationCarMarkerListFlag.current,
      infoWindowInfo.current
    );
    console.log('locationCarMarkerListFlag.current', locationCarMarkerListFlag.current);
  }

  // 设置常驻地点
  async function setPermanentPlaceList(permanentPlaceList: []) {
    // 为permanentPlaceList标记点
    // 找到这些点里面的最大值
    let max = 0;
    permanentPlaceList.forEach((item: any) => {
      if (item.number > max) {
        max = item.number;
      }
    });

    circleMarkers.current = await IMAP.bindStepColorMarkers(permanentPlaceList, max, map.current, offernStopMarkersWin);
    permanentPlaceList && map.current.setFitView();
    // map.current.add(circleMarkers.current);
  }

  // 点击marker展示的窗口点击车的信息
  function openInfoWin(markerInfo: any, map: any, marker: any, infoWindow: any, isBindAction = true) {
    const vehicleInfo = marker.markerInfo;
    const deviceInfo = marker.deviceInfo;
    console.log(marker);

    // const satellitesNum = marker.satellitesNum;
    const data = {
      ownerName: vehicleInfo?.ownerName || '无',
      plateNo: vehicleInfo?.plateNo || '无',
      vinNo: vehicleInfo?.vinNo || '无',
      deviceCode: deviceInfo?.deviceCode || '无',
      typeName: deviceInfo?.typeName || '无',
      vehicleState: vehicleInfo?.isRunning ? '动态' : '静止' + ' ' + deviceInfo.speed + 'km/h',
      deviceState: deviceInfo?.isOnline ? '在线' : `离线 ${deviceInfo?.durationTime}h`,
      lalg: `${marker.position[0]}, ${marker.position[1]}`,
      place: '转换地址中...',
      // satellitesNum: '强',
      positionTime: deviceInfo.positionTime
    };
    infoWindow.setInfoTplData(data);
    isBindAction && bindAction(infoWindow, marker);
    infoWindow.open(map, markerInfo.getPosition());
    regeoCode([marker.position[0], marker.position[1]]).then(place => {
      infoWindow.setInfoTplData({
        ...data,
        place
      });
    });
    infoWindowInfo.current = infoWindow;
  }

  // 车辆信息窗体
  function openInfoWinCar(markerInfo: any, map: any, marker: any, infoWindow: any) {
    const { plateNo, vinNo, ownerName, deviceCode, isOnline, durationTime, lastLocationTime } = markerInfo;
    let bindDeviceCode = '',
      bindTypeName = '',
      satellitesNumText = '弱';
    if (Array.isArray(deviceCode)) {
      // 追踪里面其实是一个数组,取第一位
      bindDeviceCode = deviceCode[0].deviceCode;
      bindTypeName = deviceCode[0].typeName;
    } else {
      // 兼容以前逻辑
      bindDeviceCode = deviceCode.deviceCode;
      bindTypeName = deviceCode.typeName;
    }
    if (marker.satellitesNum || marker.satellitesNum == 0) {
      satellitesNumText = marker.satellitesNum > 4 ? '强' : '弱';
    }

    const data = {
      ownerName: ownerName || '无',
      plateNo: plateNo || '无',
      vinNo: vinNo || '无',
      deviceCode: bindDeviceCode || '无',
      typeName: bindTypeName || '无',
      // vehicleState: isRunning ? '动态' : '静止' + ' ' + deviceInfo.speed + 'km/h',
      deviceState: isOnline ? '在线' : `离线 ${durationTime}h`,
      lalg: `${marker.position.lng}, ${marker.position.lat}`,
      place: '地址转换中...',
      satellitesNum: satellitesNumText,
      positionTime: marker.time || ''
    };
    infoWindow.setInfoTplData(data);
    infoWindow.open(map, marker.position);

    regeoCode([marker.position.lng, marker.position.lat]).then(place => {
      infoWindow.setInfoTplData({
        ...data,
        place
      });
    });
    infoWindowInfo.current = infoWindow;
  }

  // 长驻点的信息展示
  function offernStopMarkersWin(markerInfo: any, map: any, marker: any, infoWindow: any) {
    const { coordinates, number, stopTime } = marker;
    const data = {
      address: '转换地址中...',
      coordinates: coordinates || '无',
      number: number,
      stopTime: REPORT_UTIL.formatStayTime(stopTime)
    };
    infoWindow.setInfoTplData(data);
    infoWindow.open(map, coordinates);
    regeoCode([coordinates[0], coordinates[1]]).then(place => {
      infoWindow.setInfoTplData({
        ...data,
        address: place || '无'
      });
    });
    infoWindowInfo.current = infoWindow;
  }

  function bindAction(infoWindow: any, marker: any) {
    // 点击导航，开始导航
    infoWindow.get$InfoBody().on('click', '#mybtnSearch', marker, function(event: any) {
      //阻止冒泡
      event.stopPropagation();
      mapSearch(marker);
    });

    infoWindow.get$InfoBody().on('click', '#mybtnWatchLine', marker, function(event: any) {
      //阻止冒泡
      event.stopPropagation();
      followLine(marker);
    });

    infoWindow.get$InfoBody().on('click', '#mybtnDo', marker, function(event: any) {
      //阻止冒泡
      event.stopPropagation();
      // 展示指令弹窗 传入当前的设备号
      controllerDirectiveModal(true, marker.deviceInfo.deviceCode);
    });
  }

  // 追踪
  function mapSearch(marker: any) {
    mapProps.onMapTrack(marker);
  }

  // 查看轨迹
  function followLine(marker: any) {
    mapProps.drawDrivingLine(marker);
  }

  function regeoCode(lnglat: [number, number]) {
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

  function initMap(needBaseController = true) {
    // 获取当前用户定位
    map.current = IMAP.createMap(mapProps.id);
    needBaseController && IMAP.addBaseController(map.current);
    // 测距
    mouseTool.current = IMAP.Rule.init(map.current);
    // 区域查车
    IMAP.drawRectangle.listenDraw(mouseTool.current, searchCarFromLocation);
    // // 路况
    // initTracfficLayer();
    // // 卫星图
    // initSatellite();
    // 右键获取经纬度
    onRightClick(map.current);
  }

  function searchCarFromLocation(info: any) {
    console.log(info);
  }

  const handleChangeCircleFunction = _.debounce(handleChangeCircle, 300);

  function onRightClick(map: any) {
    map.on('rightclick', (e: any) => {
      console.log('您在 [ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ] 的位置双击了地图！');
    });
  }

  function handleCircleLocation(value: any, options: any) {
    if (searchMarker.current) {
      map.current.remove(searchMarker.current);
    }
    setStateWrap({
      currentChooseLocation: value
    });
    if (!value) {
      map.current.setFitView();
      return;
    }
    const lnglat = JSON.parse(options.value);

    searchMarker.current = new AMap.Marker({
      position: new AMap.LngLat(lnglat.lng, lnglat.lat)
    });
    map.current.add(searchMarker.current);
    map.current.setFitView();
    // 添加一个定位点到地图上
    // map.current.setCenter([lnglat.lng, lnglat.lat]);
  }

  // // 实时路况
  // function initTracfficLayer() {
  //   trafficLayer.current = new AMap.TileLayer.Traffic({
  //     zIndex: 10,
  //     visible: false
  //   });
  //   trafficLayer.current.setMap(map.current);
  // }

  // // 卫星图
  // function initSatellite() {
  //   satelliteCurrent.current = new AMap.TileLayer.Satellite({ visible: false });
  //   roadNet.current = new AMap.TileLayer.RoadNet({ visible: false });
  //   roadNet.current.setMap(map.current);
  //   satelliteCurrent.current.setMap(map.current);
  // }

  function handleChangeCircle(value: string) {
    setStateWrap({
      locationList: []
    });

    autoComplete.search(value, function(status: string, result: any) {
      // 搜索成功时，result即是对应的匹配数据
      setStateWrap({
        locationList: result.tips
      });
      console.log(result.tips);
    });
  }

  function toggle() {
    if (isVisibleTrafficLayer.current) {
      trafficLayer?.current?.hide();
      isVisibleTrafficLayer.current = false;
    } else {
      trafficLayer?.current?.show();
      isVisibleTrafficLayer.current = true;
    }
  }

  function satellite() {
    if (isVisibleSatellite.current) {
      satelliteCurrent?.current?.hide();
      roadNet?.current?.hide();
      isVisibleSatellite.current = false;
    } else {
      satelliteCurrent.current.show();
      roadNet?.current?.show();
      isVisibleSatellite.current = true;
    }
  }

  function startDrawRactangle() {
    IMAP.drawRectangle.gotoDrawRectangle(mouseTool.current);
  }

  function startRule() {
    if (!isMouseToolVisible.current) {
      message.info('开启测距');
      isVisibleLocationCar.current = false;
      mouseTool.current.close(true);
      IMAP.Rule.goToDrawRule(mouseTool.current);
    } else {
      message.info('关闭测距');
      mouseTool.current.close(true);
    }
    isMouseToolVisible.current = !isMouseToolVisible.current;
  }

  return {
    state,
    satellite,
    toggle,
    startRule,
    handleCircleLocation,
    handleChangeCircleFunction,
    startDrawRactangle
  };
}
