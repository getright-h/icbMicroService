import { IMainFenceRightProps } from './main-fence-right.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef } from 'react';
import { FENCETYPENUM } from '../create-electric-fence-component/create-electric-fence.interface';
declare const AMap: any;
declare const AMapUI: any;
import * as _ from 'lodash';
export function useMainFenceRightStore(props: IMainFenceRightProps) {
  const { state, setStateWrap } = useStateStore();
  const centerLocation = useRef([116.433322, 39.900256]);
  const map: any = useRef();
  const { currentChoose = FENCETYPENUM.CIRCLE, onValueChange, circlrR = 200 } = props;
  let { circleLocation } = props;
  useEffect(() => {
    initMap();
    geolocationCurrentLocation();
  }, []);
  function initMap() {
    // 获取当前用户定位
    map.current = new AMap.Map('container', {
      resizeEnable: true,
      zoom: 16
    });
    addBaseController(map.current);
  }
  //添加缩放和图层切换控件
  function addBaseController(map: any) {
    AMapUI.loadUI(['control/BasicControl'], function(BasicControl: any) {
      //缩放控件，显示Zoom值
      map.addControl(
        new BasicControl.Zoom({
          position: 'lb'
        })
      );

      //图层切换控件
      map.addControl(
        new BasicControl.LayerSwitcher({
          position: 'rt'
        })
      );
    });
  }

  useEffect(() => {
    drawInfoInMap();
  }, [props.circleLocation, props.currentChoose]);

  // 当传入的心心变化的时候改变当前页面的map图像
  function drawInfoInMap() {
    if (!circleLocation) {
      circleLocation = centerLocation.current;
    }
    map.current.clearMap();
    switch (currentChoose) {
      case FENCETYPENUM.CIRCLE:
        refineCircle();
        break;
      case FENCETYPENUM.POLYGON:
        refinePolygon();
        break;
      case FENCETYPENUM.ADMINISTRATIVEDIVISION:
        break;
      default:
        break;
    }
  }

  // 初始化多边形
  function refinePolygon() {
    const x = circleLocation[0];
    const y = circleLocation[1];

    const path = [
      [x - 0.0508, y - 0.045],
      [x - 0.0508, y + 0.045],
      [x + 0.0508, y + 0.045],
      [x + 0.0508, y - 0.045]
    ];
    const polygon = new AMap.Polygon({
      path: path,
      strokeColor: '#FF33FF',
      strokeWeight: 6,
      strokeOpacity: 0.2,
      fillOpacity: 0.4,
      fillColor: '#1791fc',
      zIndex: 50
    });
    map.current.add(polygon);
    map.current.setFitView([polygon]);
    const polyEditor = new AMap.PolyEditor(map.current, polygon);
    polyEditor.open();
    bindEditForMap(polyEditor, FENCETYPENUM.POLYGON, path);
  }

  // 初始化圆形
  function refineCircle() {
    const circle = new AMap.Circle({
      center: circleLocation,
      radius: circlrR, //半径
      borderWeight: 3,
      strokeColor: '#FF33FF',
      strokeWeight: 6,
      strokeOpacity: 0.2,
      fillOpacity: 0.4,
      strokeStyle: 'dashed',
      strokeDasharray: [10, 10],
      // 线样式还支持 'dashed'
      fillColor: '#1791fc',
      zIndex: 50
    });

    circle.setMap(map.current);
    map.current.setFitView([circle]);
    const circleEditor = new AMap.CircleEditor(map.current, circle);
    circleEditor.open();
    bindEditForMap(circleEditor, FENCETYPENUM.CIRCLE);
  }

  // 监听多边形和原型的事件
  function bindEditForMap(editor: any, type: number, path?: any) {
    type == FENCETYPENUM.CIRCLE &&
      editor.on(
        'move',
        _.debounce((event: any) => {
          const { lnglat } = event;
          type == FENCETYPENUM.CIRCLE && onValueChange('circleLocation', [lnglat.lng, lnglat.lat]);
        }, 500)
      );

    editor.on(
      'adjust',
      _.debounce((event: any) => {
        type == FENCETYPENUM.CIRCLE && onValueChange('circlrR', event.radius);
        type == FENCETYPENUM.POLYGON && onValueChange('polygon', path);
      }, 500)
    );
  }

  // Geolocation
  function geolocationCurrentLocation() {
    AMap.plugin('AMap.Geolocation', function() {
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000, //超过10秒后停止定位，默认：5s
        buttonPosition: 'RB', //定位按钮的停靠位置
        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
      });

      map.current.addControl(geolocation);
      geolocation.getCurrentPosition(function(status: string, result: any) {
        if (status == 'complete') {
          centerLocation.current = [result.position.lng, result.position.lat];
          drawInfoInMap();
        }
      });
    });
  }

  return { state };
}
