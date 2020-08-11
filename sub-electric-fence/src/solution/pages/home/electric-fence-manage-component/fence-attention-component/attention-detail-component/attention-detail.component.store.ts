import { IAttentionDetailState, AttentionDetailInfo } from './attention-detail.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef } from 'react';
declare const AMap: any;
declare const AMapUI: any;
import { IMAP } from '~/solution/shared/util/map.util';
export function useAttentionDetailStore(props: AttentionDetailInfo) {
  const { state, setStateWrap } = useStateStore(new IAttentionDetailState());
  const map: any = useRef();
  const centerLocation = useRef([116.433322, 39.900256]);
  useEffect(() => {
    map.current = new AMap.Map('container', {
      zoom: 13,
      center: props.baseData.alarmLocation,
      resizeEnable: true
    });
    props.baseData.alarmLocation && initMap();
  }, [props.baseData.alarmLocation]);

  function initMap() {
    // 获取当前用户定位

    const marker = new AMap.Marker({
      position: new AMap.LngLat(props.baseData.alarmLocation[0], props.baseData.alarmLocation[1]),
      icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
      offset: new AMap.Pixel(-13, -30)
    });
    map.current.add(marker);
  }

  function setCurrentCenter(lgnlat: Array<number>) {
    centerLocation.current = lgnlat;
  }
  return { state };
}
