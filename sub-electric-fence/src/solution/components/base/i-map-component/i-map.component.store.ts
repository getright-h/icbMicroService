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
  const mouseTool: any = useRef();
  const trafficLayer: any = useRef({});
  const isVisibleTrafficLayer = useRef(false);
  const satelliteCurrent: any = useRef();
  const roadNet: any = useRef();
  const isMouseToolVisible = useRef(false);
  const isVisibleSatellite = useRef(false);
  const isVisibleLocationCar = useRef(false);
  const locationCarMarkerListFlag = useRef([]);
  useEffect(() => {
    initMap();
  }, []);

  useEffect(() => {
    // 单个车选中，需要获取常驻地点
    if (mapProps.currentSelectCar) {
      renderMarker([mapProps.currentSelectCar]);
      // 多个车不用获取常驻地点
    } else if (mapProps.locationCarMarkerList) {
      // 比对
      renderMarker(mapProps.locationCarMarkerList);
    }
  }, [mapProps.locationCarMarkerList, mapProps.currentSelectCar]);

  useEffect(() => {
    //实时追踪的car,car会在最后一个店停下来
    // 这个地方会进行轨迹修复
    if (mapProps.carLine) {
      map.current.clearMap();
      const carLine = mapProps.carLine.map(item => {
        item = IMAP.initLonlat(item[0], item[1]);
        return item;
      });
      IMAP.drawLine(map.current, carLine);
      const position = carLine[carLine.length - 1];
      console.log([position.lng, position.lat]);

      new AMap.Marker({
        map: map.current,
        position: position,
        icon: 'https://webapi.amap.com/images/car.png',
        offset: new AMap.Pixel(-26, -13),
        autoRotation: true,
        angle: -90
      });
      map.setFitView();
    }
  }, [mapProps.carLine]);

  function renderMarker(data: any) {
    const markersInfo: any = [];
    data?.forEach((element: any) => {
      //  描定位点，在传入钱转化成格式
      // 确定当前使用的是哪个设备
      let currentMarker = element.children[0];
      if (data.length == 1 && mapProps.currentSelectCar) {
        // 说明当前的点是被选中的， 所以可以筛选其中选中的设备

        for (const item of element.children) {
          if (item.selected) {
            currentMarker = item;
            break;
          }
        }
      }
      markersInfo.push({
        position: currentMarker.locationInfo.coordinates,
        icon: currentMarker.status ? require('~assets/image/offline.png') : require('~assets/image/online.png'),
        markerInfo: currentMarker.locationInfo,
        status: currentMarker.statusText
      });
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

  function openInfoWin(markerInfo: any, map: any, marker: any, infoWindow: any) {
    regeoCode([marker.position[0], marker.position[1]]).then(place => {
      infoWindow.setInfoTplData({
        identificationNumber: marker?.markerInfo?.identificationNumber || '无',
        licenceNumber: marker?.markerInfo?.licenceNumber || '无',
        unitName: marker?.markerInfo?.unitName || '无',
        status: marker?.status === 0 ? '离线' : '在线',
        lalg: `${marker.position[0]}, ${marker.position[1]}`,
        place
      });
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
      infoWindow.open(map, markerInfo.getPosition());
    });
  }

  // 追踪
  function mapSearch(marker: any) {
    console.log(marker);
  }

  // 查看轨迹
  function followLine(marker: any) {
    console.log(marker);
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
    const lnglat = JSON.parse(options.value);
    map.current.setCenter([lnglat.lng, lnglat.lat]);
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
  return { state, satellite, toggle, startRule, handleCircleLocation, handleChangeCircleFunction, startDrawRactangle };
}
