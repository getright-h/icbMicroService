import { IFenceMapProps, IFenceMapState } from './fence-map.interface';
import { useStateStore } from '@fch/fch-tool';
import { IMAP } from '~/solution/shared/util/map.util';
import { useEffect, useRef } from 'react';
import { FENCE_TYPE_ENUM } from '../area-search-car.interface';
import { FenceManageService } from '~/solution/model/services/fence-manage.service';
import _ from 'lodash';
declare const AMap: any;
declare const AMapUI: any;

export function useFenceMapStore(props: IFenceMapProps) {
  const { state, setStateWrap } = useStateStore(new IFenceMapState());
  const map: any = useRef();
  const centerLocation = useRef([116.433322, 39.900256]);
  const centerMarker = useRef();
  const deviceMarkers = useRef<any[]>();
  const infoWindowInfo = useRef<any>();
  const { fenceType, onValueChange, districtAdcode } = props;
  let { circleLocation } = props;
  const fenceManageService = new FenceManageService();

  useEffect(() => {
    initMap();
    // IMAP.getCurrentLocation(map.current, setCurrentCenter);
  }, []);

  useEffect(() => {
    if (props.pointDatas?.length) {
      const markers = props.pointDatas.map(item => {
        item.coordinates = new AMap.LngLat(item.lg, item.lt);
        return item;
      });
      deviceMarkers.current = IMAP.bindCommonMarkers(markers, map.current);
      deviceMarkers.current.forEach((marker: any, i: number) => {
        marker.on('click', () => showPointInfo(markers[i], map.current, marker, openPointWin));
      });
    }
    return () => {
      deviceMarkers.current && map.current.remove(deviceMarkers.current);
      infoWindowInfo.current && infoWindowInfo.current.close();
    };
  }, [props.pointDatas]);

  useEffect(() => {
    if (!circleLocation) {
      circleLocation = centerLocation.current;
    }
    map.current.clearMap();
    switch (fenceType) {
      case FENCE_TYPE_ENUM.POLYGON:
        refinePolygon();
        drawCenterMarker(map.current, circleLocation, (marker: any) => {
          centerMarker.current = marker;
        });
        break;
      case FENCE_TYPE_ENUM.ADMINISTRATIVEDIVISION:
        drawPolylineByDistrictInfo();
        break;
      default:
        break;
    }
    return () => {
      centerMarker.current && map.current.remove(centerMarker.current);
    };
  }, [fenceType, districtAdcode, circleLocation]);

  function initMap() {
    // 获取当前用户定位
    map.current = IMAP.createMap('container');
    IMAP.addBaseController(map.current);
  }

  function setCurrentCenter(lgnlat: [number, number]) {
    centerLocation.current = lgnlat;
  }

  function drawCenterMarker(map: any, position: number[], callback: any): any {
    const marker = new AMap.Marker({
      icon: new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(20, 30),
        // 图标的取图地址
        image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
        // 图标所用图片大小
        imageSize: new AMap.Size(20, 30)
      }),
      position
      // offset: new AMap.Pixel(-13, -30)
    });
    marker.setMap(map);
    callback(marker);
  }

  // 初始化多边形
  function refinePolygon() {
    const x = circleLocation[0];
    const y = circleLocation[1];

    const path = [
      [x - 0.007, y - 0.005],
      [x - 0.007, y + 0.005],
      [x + 0.007, y + 0.005],
      [x + 0.007, y - 0.005]
    ];
    const { polyEditor } = IMAP.createPolygon(circleLocation, map.current, path);

    onValueChange('polygon', path);
    bindEditForMap(polyEditor, FENCE_TYPE_ENUM.POLYGON, path);
  }

  // 监听多边形和原型的事件
  function bindEditForMap(editor: any, type: number, path?: any) {
    editor.on(
      'adjust',
      _.debounce((event: any) => {
        console.log(12);

        type == FENCE_TYPE_ENUM.POLYGON && onValueChange('polygon', path);
      }, 500)
    );
  }

  function drawPolylineByDistrictInfo() {
    !!districtAdcode &&
      fenceManageService.fenceDistrictInfo({ adcode: districtAdcode }).subscribe(res => {
        const paths = exchangePath(res.polylines[0]);
        IMAP.createPolygon(null, map.current, paths, false);
      });
  }

  //转换{ lng: number; lat: number } 为 【lng， lat】
  function exchangePath(polyline: Array<{ lng: number; lat: number }>) {
    const paths =
      polyline &&
      polyline.length &&
      polyline.map(item => {
        return [item.lng, item.lat];
      });
    return paths;
  }

  function showPointInfo(
    markerInfo: any,
    map: any,
    marker: any,
    callback?: (markerInfo: any, map: any, marker: any, infoWindow: any) => void
  ) {
    AMapUI.loadUI(['overlay/SimpleInfoWindow'], (SimpleInfoWindow: any) => {
      const infoWindow = new SimpleInfoWindow({
        infoTitle: '<strong>设备信息</strong>',
        infoBody: `
        <div class="vehicle-basic-info">
          <div class="basic">
            <div class="item">设备号：<%- dc %></div>
            <div class="item">地址：<%- address %></div>
            <div class="item">时间：<%- time %></div>
          </div>
        </div>`,

        infoTplData: {
          dc: '',
          time: '',
          address: ''
        },

        //基点指向marker的头部位置
        offset: new AMap.Pixel(0, -31)
      });
      callback(markerInfo, map, marker, infoWindow);
    });
  }

  function openPointWin(markerInfo: any, map: any, marker: any, infoWindow: any) {
    const { coordinates } = markerInfo;
    infoWindow.open(map, coordinates);
    infoWindow.setInfoTplData(markerInfo);
    infoWindowInfo.current = infoWindow;
  }

  return { state };
}
