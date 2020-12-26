import { IIMapState, TIMapProps } from './i-map.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef } from 'react';
import * as _ from 'lodash';
import { IMAP } from '~/solution/shared/util/map.util';
import { message } from 'antd';
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
  const infoWindowInfo: any = useRef();
  const finishedRun = useRef(false);

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
    currentPoint
  } = mapProps;
  useEffect(() => {
    initMap();
  }, []);

  // 单个车选中，需要获取常驻地点
  useEffect(() => {
    if (currentSelectCar) {
      renderMarker([currentSelectCar]);
      // 清除当前常驻点
      circleMarkers.current.length && map.current.remove(circleMarkers.current);
      currentSelectCar.permanentPlaceList.length && setPermanentPlaceList(currentSelectCar.permanentPlaceList);
      // 需要添加常驻地点
      // 多个车不用获取常驻地点
    } else if (locationCarMarkerList) {
      // 比对
      renderMarker(locationCarMarkerList);
    }
  }, [locationCarMarkerList, currentSelectCar]);

  //实时追踪的car,car会在最后一个点停下来
  // 这个地方会进行轨迹修复
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
  }, [mapProps.carLine]);

  /**
   * // 轨迹回放
   * 包含暂停开始速度切换功能，停留点标记
   */
  useEffect(() => {
    //drivingLineData 轨迹回放的点
    // 发生变化重新绘制播放
    map.current.clearMap();
    if (mapProps.drivingLineData?.pointList?.length) {
      const { pointList } = mapProps.drivingLineData;
      const carLine = pointList.map(item => {
        item = IMAP.initLonlat(item.coordinates[0], item.coordinates[1]);
        return item;
      });
      polyline.current = IMAP.drawLine(map.current, carLine);
      const position = carLine[carLine.length - 1];
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
      console.log('carLine', carLine);

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

      map.current.setFitView();
    }
  }, [mapProps.drivingLineData]);

  // 切换轨迹回放车的状态
  useEffect(() => {
    if (carLineMarkerInfo.current) {
      if (isRunning) {
        // 暂停显示当前车辆信息
        carLineMarkerInfo.current.pauseMove();
        const position = havePassedArr.current[havePassedArr.current.length - 1];

        IMAP.showCarInfo(mapProps.drivingLineData, map.current, { position }, openInfoWinCar);
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
    if (currentAllPoints.current.length) {
      notPassedArr.current = [...currentAllPoints.current.slice(currentPoint)];
    }
    if (carLineMarkerInfo.current) {
      // 切换速度，看下现在的点跑到哪里了，然后截断现在的点的位置，继续跑
      carLineMarkerInfo.current.moveAlong(notPassedArr.current, 200 * carSpeed);
    }
    // 移动车
  }, [currentPoint, carSpeed]);
  // 批量标记车辆 大批量车辆打点专用
  function renderMarker(data: any) {
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

    console.log('重绘界面啦', markersInfo);
    //开始画车走起
    locationCarMarkerListFlag.current = IMAP.bindMarkerClick(
      markersInfo,
      map.current,
      openInfoWin,
      locationCarMarkerListFlag.current
    );
  }

  // 设置常驻地点
  function setPermanentPlaceList(permanentPlaceList: []) {
    // 为permanentPlaceList标记点
    // 找到这些点里面的最大值
    let max = 0;
    permanentPlaceList.forEach((item: any) => {
      if (item.number > max) {
        max = item.number;
      }
    });
    permanentPlaceList.forEach((item: any) => {
      const circleMarker = IMAP.bindStepColorMarker(item.coordinates, item.number, max);
      circleMarkers.current.push(circleMarker);
    });

    map.current.add(circleMarkers.current);
  }

  // 点击marker展示的窗口点击车的信息
  function openInfoWin(markerInfo: any, map: any, marker: any, infoWindow: any, isBindAction = true) {
    const vehicleInfo = marker.markerInfo;
    const deviceInfo = marker.deviceInfo;

    regeoCode([marker.position[0], marker.position[1]]).then(place => {
      infoWindow.setInfoTplData({
        ownerName: vehicleInfo?.ownerName || '无',
        plateNo: vehicleInfo?.plateNo || '无',
        vinNo: vehicleInfo?.vinNo || '无',
        deviceCode: deviceInfo?.deviceCode || '无',
        typeName: deviceInfo?.typeName || '无',
        vehicleState: vehicleInfo?.isRunning ? '动态' : '静止' + ' ' + deviceInfo.speed + 'km/h',
        deviceState: deviceInfo?.isOnline ? '在线' : `离线 ${deviceInfo?.durationTime}h`,
        lalg: `${marker.position[0]}, ${marker.position[1]}`,
        place,
        positionTime: deviceInfo.positionTime
      });
      isBindAction && bindAction(infoWindow, marker);
      infoWindow.open(map, markerInfo.getPosition());

      infoWindowInfo.current = infoWindow;
    });
  }

  function openInfoWinCar(markerInfo: any, map: any, marker: any, infoWindow: any) {
    const { plateNo, vinNo, ownerName, deviceCode, isOnline, durationTime, lastLocationTime } = markerInfo;

    regeoCode([marker.position.lng, marker.position.lat]).then(place => {
      infoWindow.setInfoTplData({
        ownerName: ownerName || '无',
        plateNo: plateNo || '无',
        vinNo: vinNo || '无',
        deviceCode: deviceCode.deviceCode || '无',
        typeName: deviceCode.typeName || '无',
        // vehicleState: isRunning ? '动态' : '静止' + ' ' + deviceInfo.speed + 'km/h',
        deviceState: isOnline ? '在线' : `离线 ${durationTime}h`,
        lalg: `${marker.position.lng}, ${marker.position.lat}`,
        place,
        positionTime: lastLocationTime
      });

      infoWindow.open(map, marker.position);

      infoWindowInfo.current = infoWindow;
    });
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

  function initMap() {
    // 获取当前用户定位
    map.current = IMAP.createMap(mapProps.id);
    IMAP.addBaseController(map.current);
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
    if (!isVisibleLocationCar.current) {
      message.info('开启区域查车');
      isMouseToolVisible.current = false;
      mouseTool.current.close(true);
      IMAP.drawRectangle.gotoDrawRectangle(mouseTool.current);
    } else {
      message.info('关闭区域查车');
      mouseTool.current.close(true);
    }
    isVisibleLocationCar.current = !isVisibleLocationCar.current;
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
