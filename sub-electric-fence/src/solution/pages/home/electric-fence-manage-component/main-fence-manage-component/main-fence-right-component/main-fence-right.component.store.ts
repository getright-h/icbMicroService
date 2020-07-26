import { IMainFenceRightProps } from './main-fence-right.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef, useContext } from 'react';
import { FENCETYPENUM } from '../create-electric-fence-component/create-electric-fence.interface';
declare const AMap: any;
declare const AMapUI: any;
import * as _ from 'lodash';
import { IMAP } from '~/solution/shared/util/map.util';
import { FenceManageService } from '~/solution/model/services/fence-manage.service';
import { MainFenceManageContext } from '../main-fence-manage.provider';
export function useMainFenceRightStore(props: IMainFenceRightProps) {
  const { state } = useStateStore();
  const centerLocation = useRef([116.433322, 39.900256]);
  const map: any = useRef();
  const fenceManageService = new FenceManageService();
  const { currentChoose = FENCETYPENUM.POLYGON, onValueChange, circlrR = 200, isEdit } = props;
  let { circleLocation } = props;
  // const { dispatch, mainFenceManageState } = props;
  const { mainFenceManageState } = React.useContext(MainFenceManageContext);
  useEffect(() => {
    initMap();
    IMAP.getCurrentLocation(map.current, setCurrentCenter);
  }, []);
  const { editData, visible } = mainFenceManageState;
  console.log(visible);

  useEffect(() => {
    map.current.clearMap();
    if (editData) {
      if (editData.fenceType == FENCETYPENUM.POLYGON) {
        const paths = exchangePath(editData.polyline);
        const { polyEditor, path } = IMAP.createPolygon(null, map.current, paths, visible);
        polyEditor && bindEditForMap(polyEditor, FENCETYPENUM.POLYGON, path);
      } else if (editData.fenceType == FENCETYPENUM.ADMINISTRATIVEDIVISION) {
        // 获取当前的行政区域的点
        const { city, district, province } = editData.district;
        const adcode = (district && district.adcode) || (city && city.adcode) || (province && province.adcode);
        fenceManageService.fenceDistrictInfo({ adcode }).subscribe(res => {
          const paths = exchangePath(res.polylines[0]);
          IMAP.createPolygon(null, map.current, paths, false);
        });
      }
    }
    if (!editData && !isEdit && visible) {
      drawInfoInMap();
    }
  }, [editData, isEdit, visible]);

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

  function setCurrentCenter(lgnlat: [number, number]) {
    centerLocation.current = lgnlat;
  }

  function initMap() {
    // 获取当前用户定位
    map.current = IMAP.createMap('container');
    IMAP.addBaseController(map.current);
  }

  useEffect(() => {
    if (visible) {
      drawInfoInMap();
    }
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

    onValueChange('polygon', path);
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
        console.log(12);

        type == FENCETYPENUM.CIRCLE && onValueChange('circlrR', event.radius);
        type == FENCETYPENUM.POLYGON && onValueChange('polygon', path);
      }, 500)
    );
  }

  return { state };
}
