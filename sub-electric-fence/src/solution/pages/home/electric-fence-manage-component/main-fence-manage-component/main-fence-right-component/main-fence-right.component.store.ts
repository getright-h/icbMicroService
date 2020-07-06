import { IMainFenceRightProps } from './main-fence-right.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef } from 'react';
import { FENCETYPENUM } from '../create-electric-fence-component/create-electric-fence.interface';
declare const AMap: any;
declare const AMapUI: any;
import * as _ from 'lodash';
import { IMAP } from '~/solution/shared/util/map.util';
export function useMainFenceRightStore(props: IMainFenceRightProps) {
  const { state } = useStateStore();
  const centerLocation = useRef([116.433322, 39.900256]);
  const map: any = useRef();
  const { currentChoose = FENCETYPENUM.CIRCLE, onValueChange, circlrR = 200 } = props;
  let { circleLocation } = props;
  useEffect(() => {
    initMap();
    IMAP.getCurrentLocation(map.current, setCurrentCenter);
  }, []);

  function setCurrentCenter(lgnlat: [number, number]) {
    centerLocation.current = lgnlat;
    drawInfoInMap();
  }

  function initMap() {
    // 获取当前用户定位
    map.current = IMAP.createMap('container');
    IMAP.addBaseController(map.current);
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
    const { polyEditor, path } = IMAP.createPolygon(circleLocation, map.current);
    bindEditForMap(polyEditor, FENCETYPENUM.POLYGON, path);
  }

  // 初始化圆形
  function refineCircle() {
    const circleEditor = IMAP.createCircle(circleLocation, circlrR, map.current);
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

  return { state };
}
